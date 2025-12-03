const User = require("../models/User");
const Onboarding = require("../models/Onboarding");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

function generateToken(userId) {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
}

// Register User
async function registerUser(req, res) {
  try {
    const { name, phone, email, password } = req.body;
    console.log('=== REGISTRATION ===');
    console.log('Phone:', phone);
    console.log('Password received:', password);
    console.log('Password length (raw):', password.length);
    
    if (!name || !phone || !password) {
      return res.status(400).json({ error: "Name, phone, and password are required" });
    }
    // Check if user exists by phone or email
    const existingUser = await User.findOne({ $or: [{ phone }, { email }] });
    if (existingUser) {
      console.log('User already exists:', phone);
      return res.status(409).json({ error: "User already exists with this phone or email" });
    }
    // Trim password to remove whitespace
    const trimmedPassword = password.trim();
    console.log('Password after trim:', trimmedPassword);
    console.log('Password length (trimmed):', trimmedPassword.length);
    
    console.log('Saving user with trimmed password (hashing handled by schema)');
    console.log('===================');
    // Create user (schema pre-save hook will hash password)
    const user = await User.create({
      name,
      phone,
      email,
      password: trimmedPassword,
    });
    // Create empty onboarding doc
    await Onboarding.create({ userId: user._id });
    // Return user info + JWT
    res.status(201).json({
      user: {
        id: user._id,
        name: user.name,
        phone: user.phone,
        email: user.email,
        role: user.role,
        isVerified: user.isVerified,
      },
      token: generateToken(user._id),
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Login User
async function loginUser(req, res) {
  try {
    const { phone, password } = req.body;
    console.log('=== LOGIN ATTEMPT ===');
    console.log('Phone:', phone);
    console.log('Password received:', password);
    console.log('Password length (raw):', password.length);
    
    if (!phone || !password) {
      return res.status(400).json({ error: "Phone and password are required" });
    }
    const user = await User.findOne({ phone });
    if (!user) {
      console.log('❌ User NOT FOUND for phone:', phone);
      console.log('====================');
      return res.status(401).json({ error: "Invalid credentials" });
    }
    console.log('✅ User FOUND:', user.phone);
    
    // Trim password to match registration
    const trimmedPassword = password.trim();
    console.log('Password after trim:', trimmedPassword);
    console.log('Password length (trimmed):', trimmedPassword.length);
    
    const isMatch = await bcrypt.compare(trimmedPassword, user.password);
    console.log('Password match result:', isMatch);
    console.log('====================');
    
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    res.json({
      user: {
        id: user._id,
        name: user.name,
        phone: user.phone,
        email: user.email,
        role: user.role,
        isVerified: user.isVerified,
      },
      token: generateToken(user._id),
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: err.message });
  }
}

// Update Profile
async function updateProfile(req, res) {
  try {
    const userId = req.user.id; // From protect middleware
    const { name, email } = req.body;

    if (!name) {
      return res.status(400).json({ error: "Name is required" });
    }

    // Validate email if provided
    if (email && !email.includes('@')) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    // Update user
    const user = await User.findByIdAndUpdate(
      userId,
      { name, email },
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({
      user: {
        id: user._id,
        name: user.name,
        phone: user.phone,
        email: user.email,
        role: user.role,
        isVerified: user.isVerified,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Delete user by phone (for testing only - remove in production!)
async function deleteUserByPhone(req, res) {
  try {
    const { phone } = req.params;
    console.log('Deleting user with phone:', phone);
    
    const user = await User.findOne({ phone });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    
    // Delete associated onboarding record
    await Onboarding.deleteOne({ userId: user._id });
    
    // Delete user
    await User.deleteOne({ phone });
    
    console.log('User deleted successfully:', phone);
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    console.error('Delete user error:', err);
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  registerUser,
  loginUser,
  updateProfile,
  deleteUserByPhone,
};
