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
    if (!name || !phone || !password) {
      return res.status(400).json({ error: "Name, phone, and password are required" });
    }
    // Check if user exists by phone or email
    const existingUser = await User.findOne({ $or: [{ phone }, { email }] });
    if (existingUser) {
      return res.status(409).json({ error: "User already exists with this phone or email" });
    }
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create user
    const user = await User.create({
      name,
      phone,
      email,
      password: hashedPassword,
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
    if (!phone || !password) {
      return res.status(400).json({ error: "Phone and password are required" });
    }
    const user = await User.findOne({ phone });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
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

module.exports = {
  registerUser,
  loginUser,
  updateProfile,
};
