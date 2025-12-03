# BikeRentalApp – Full Stack Scooter Rental & Rider Onboarding System

A complete full-stack mobile application for scooter rental management with comprehensive rider onboarding. Built with **Node.js + Express + MongoDB** on the backend and **Expo React Native** on the frontend. Features include KYC verification (Aadhaar, PAN, Driving License, Bank), real-time vehicle tracking, EV battery monitoring, rental plan management, interactive maps, earnings dashboard, and issue reporting system.

---

## 📱 Demo & Screenshots

### App Preview Video
> 🎥 *Coming soon - Demo video will be added here*

### Screenshots
> 📸 Screenshots available in `/screenshots/` folder

---

## ✨ Features

### 🔐 **Authentication & Security**
- User registration and login with JWT authentication
- Auto-login with token persistence using AsyncStorage
- Automatic token expiry handling with auto-logout
- Session timeout notifications

### 🪪 **KYC Onboarding System**
- Complete 4-step verification process:
  - **Aadhaar Card** verification with image upload
  - **PAN Card** verification with image upload
  - **Driving License** verification with image upload
  - **Bank Account** details submission
- Real-time verification status tracking
- Cloudinary integration for secure document storage

### 🛵 **Vehicle Management**
- Browse all available scooters
- Real-time vehicle status (ON/OFF/MOVING)
- Vehicle location updates
- Remote vehicle commands
- Detailed vehicle information cards

### ⚡ **Electric Vehicle (EV) Monitoring**
- EV fleet listing
- Battery percentage tracking
- Charging status indicators
- Range estimation

### 📍 **Interactive Map**
- Real-time vehicle location markers
- Interactive map with react-native-maps
- Location-based vehicle discovery

### 📊 **Dashboard & Analytics**
- Earnings overview
- Performance statistics
- Visual data cards

### 📦 **Rental Plans**
- Multiple rental plan options
- Plan comparison cards
- Pricing details

### ❗ **Issue Reporting System**
- Browse issue categories
- Submit detailed issue reports
- Track issue status

### 👤 **Profile Management**
- View and edit user profile
- Update personal information
- Profile status indicators

### 🎨 **UI/UX Excellence**
- Toast notifications for user feedback
- Global fullscreen loader overlay
- Clean, modern theme system
- Responsive design
- Consistent color palette and spacing

---

## 🛠️ Technologies Used

### Backend
| Technology | Purpose |
|------------|---------|
| **Node.js** | Runtime environment |
| **Express** | Web framework |
| **MongoDB** | NoSQL database |
| **Mongoose** | ODM for MongoDB |
| **JWT** | Authentication tokens |
| **bcryptjs** | Password hashing |
| **Joi** | Request validation |
| **Multer** | File upload handling |
| **Cloudinary** | Cloud image storage |
| **Streamifier** | Stream conversion |
| **Morgan** | HTTP request logging |
| **CORS** | Cross-origin resource sharing |

### Frontend
| Technology | Purpose |
|------------|---------|
| **Expo** | React Native framework |
| **React Native** | Mobile app development |
| **React Navigation** | Navigation library |
| **Axios** | HTTP client |
| **AsyncStorage** | Local data persistence |
| **react-native-toast-message** | Toast notifications |
| **react-native-maps** | Map integration |
| **expo-image-picker** | Image selection |
| **expo-splash-screen** | Splash screen management |

---

## 🏗️ Backend Architecture

```
server/
├── src/
│   ├── config/
│   │   ├── db.js                  # MongoDB connection
│   │   └── cloudinary.js          # Cloudinary configuration
│   │
│   ├── models/
│   │   ├── User.js                # User schema
│   │   ├── Onboarding.js          # KYC documents schema
│   │   ├── Vehicle.js             # Scooter/bike schema
│   │   ├── EV.js                  # Electric vehicle schema
│   │   ├── RentalPlan.js          # Rental plans schema
│   │   ├── Issue.js               # Issue reports schema
│   │   └── Earning.js             # Earnings schema
│   │
│   ├── controllers/
│   │   ├── auth.controller.js     # Auth logic (register, login, profile)
│   │   ├── onboarding.controller.js   # KYC submission & verification
│   │   ├── vehicles.controller.js     # Vehicle CRUD & status updates
│   │   ├── ev.controller.js           # EV listing & battery info
│   │   ├── rentalPlans.controller.js  # Rental plan management
│   │   ├── issues.controller.js       # Issue reporting system
│   │   ├── dashboard.controller.js    # Earnings & analytics
│   │   └── map.controller.js          # Vehicle location data
│   │
│   ├── routes/
│   │   ├── auth.routes.js         # Auth endpoints
│   │   ├── onboarding.routes.js   # Onboarding endpoints
│   │   ├── vehicles.routes.js     # Vehicle endpoints
│   │   ├── ev.routes.js           # EV endpoints
│   │   ├── rentalPlans.routes.js  # Rental plan endpoints
│   │   ├── issues.routes.js       # Issue endpoints
│   │   ├── dashboard.routes.js    # Dashboard endpoints
│   │   └── map.routes.js          # Map endpoints
│   │
│   ├── middleware/
│   │   ├── authMiddleware.js      # JWT verification
│   │   ├── upload.js              # Multer + Cloudinary integration
│   │   ├── validate.js            # Joi validation middleware
│   │   └── errorMiddleware.js     # Global error handler
│   │
│   └── validation/
│       ├── authValidator.js       # Auth request validation
│       ├── aadhaarValidator.js    # Aadhaar validation rules
│       ├── panValidator.js        # PAN validation rules
│       ├── dlValidator.js         # Driving License validation
│       └── bankValidator.js       # Bank details validation
│
├── index.js                       # Express server entry point
├── package.json
└── .env                           # Environment variables
```

### Module Descriptions

- **Auth**: User registration, login, profile updates with JWT token generation
- **Onboarding**: 4-step KYC verification (Aadhaar, PAN, DL, Bank) with image uploads
- **Vehicles**: CRUD operations, status updates, location tracking, remote commands
- **EV**: Electric vehicle listing with battery and charging status
- **Dashboard**: User earnings and performance analytics
- **Rental Plans**: Rental plan catalog and pricing information
- **Issues**: Issue category browsing and report submission
- **Map**: Real-time vehicle location data for map markers

---

## 📱 Frontend Architecture

```
client/
├── src/
│   ├── navigation/
│   │   ├── AppNavigator.js        # Root navigator (Auth check)
│   │   ├── AuthNavigator.js       # Login/Register stack
│   │   └── MainTabs.js            # Bottom tab navigation
│   │
│   ├── screens/
│   │   ├── SplashScreen.js        # App initialization
│   │   │
│   │   ├── Auth/
│   │   │   ├── LoginScreen.js     # User login
│   │   │   └── RegisterScreen.js  # User registration
│   │   │
│   │   ├── Onboarding/
│   │   │   ├── OnboardingHome.js  # KYC landing page
│   │   │   ├── AadhaarScreen.js   # Aadhaar upload
│   │   │   ├── PanScreen.js       # PAN upload
│   │   │   ├── DLScreen.js        # Driving License upload
│   │   │   ├── BankScreen.js      # Bank details
│   │   │   └── VerificationStatusScreen.js  # Status tracking
│   │   │
│   │   ├── Dashboard/
│   │   │   └── DashboardScreen.js # Earnings & stats
│   │   │
│   │   ├── Vehicles/
│   │   │   └── VehicleListScreen.js   # All vehicles
│   │   │
│   │   ├── EV/
│   │   │   └── EVListScreen.js    # Electric vehicles
│   │   │
│   │   ├── Plans/
│   │   │   └── RentalPlansScreen.js   # Rental plans
│   │   │
│   │   ├── Map/
│   │   │   └── MapScreen.js       # Interactive map
│   │   │
│   │   ├── Issues/
│   │   │   ├── IssueCategoriesScreen.js   # Issue categories
│   │   │   └── SubmitIssueScreen.js       # Report issues
│   │   │
│   │   └── Profile/
│   │       ├── ProfileScreen.js   # View profile
│   │       └── EditProfileScreen.js   # Edit profile
│   │
│   ├── components/
│   │   ├── ButtonPrimary.js       # Primary action button
│   │   ├── InputField.js          # Text input component
│   │   ├── VehicleCard.js         # Vehicle display card
│   │   ├── EVCard.js              # EV display card
│   │   ├── RentalPlanCard.js      # Rental plan card
│   │   ├── StatCard.js            # Dashboard stat card
│   │   ├── IssueCard.js           # Issue category card
│   │   ├── Loader.js              # Loading spinner
│   │   └── FullscreenLoader.js    # Global overlay loader
│   │
│   ├── context/
│   │   ├── AuthContext.js         # Auth state management
│   │   └── LoadingContext.js      # Global loading state
│   │
│   ├── services/
│   │   ├── api.js                 # Axios instance + interceptors
│   │   ├── authService.js         # Auth API calls
│   │   ├── onboardingService.js   # Onboarding API calls
│   │   ├── vehicleService.js      # Vehicle API calls
│   │   ├── evService.js           # EV API calls
│   │   ├── plansService.js        # Rental plans API calls
│   │   ├── dashboardService.js    # Dashboard API calls
│   │   ├── issuesService.js       # Issues API calls
│   │   ├── mapService.js          # Map API calls
│   │   └── profileService.js      # Profile API calls
│   │
│   └── utils/
│       ├── theme.js               # Colors, spacing, typography
│       ├── constants.js           # App-wide constants
│       ├── imagePicker.js         # Image picker utility
│       └── toastConfig.js         # Toast configuration
│
├── assets/                        # App icons & images
├── App.js                         # Root component
├── app.json                       # Expo configuration
└── package.json
```

### Architecture Highlights

- **Navigation**: 3-tier navigation system (App → Auth/Main → Tabs/Stacks)
- **State Management**: Context API for auth and global loading states
- **API Layer**: Centralized axios instance with request/response interceptors
- **Error Handling**: Global error handling with auto-logout on 401
- **Theming**: Centralized theme system for consistent UI

---

## 📡 API Endpoints

### 🔐 Authentication
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `/api/auth/register` | Register new user | ❌ |
| `POST` | `/api/auth/login` | User login | ❌ |
| `PUT` | `/api/auth/update-profile` | Update user profile | ✅ |

### 🪪 Onboarding (KYC)
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `/api/onboarding/aadhaar` | Submit Aadhaar details + image | ✅ |
| `POST` | `/api/onboarding/pan` | Submit PAN details + image | ✅ |
| `POST` | `/api/onboarding/dl` | Submit DL details + image | ✅ |
| `POST` | `/api/onboarding/bank` | Submit bank account details | ✅ |
| `GET` | `/api/onboarding/status/:userId` | Get KYC verification status | ✅ |
| `PATCH` | `/api/onboarding/:userId/status` | Update verification status | ✅ |

### 🛵 Vehicles
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/api/vehicles` | Get all vehicles | ✅ |
| `GET` | `/api/vehicles/:id` | Get vehicle details | ✅ |
| `PATCH` | `/api/vehicles/:id/status` | Update vehicle status | ✅ |
| `PATCH` | `/api/vehicles/:id/location` | Update vehicle location | ✅ |
| `POST` | `/api/vehicles/:id/command` | Send remote command | ✅ |

### ⚡ Electric Vehicles
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/api/ev/list` | Get all EVs with battery info | ✅ |

### 📦 Rental Plans
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/api/rental-plans` | Get all rental plans | ✅ |

### ❗ Issues
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/api/issues/categories` | Get issue categories | ✅ |
| `POST` | `/api/issues/report` | Submit new issue report | ✅ |

### 📊 Dashboard
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/api/dashboard/earnings/:userId` | Get user earnings data | ✅ |

### 📍 Map
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/api/map/vehicles` | Get all vehicle locations | ✅ |

---

## 🔧 Environment Variables

### Backend (`.env`)
```env
# Database
MONGO_URI=mongodb+srv://your-username:your-password@cluster.mongodb.net/bikerental

# Authentication
JWT_SECRET=your-super-secret-jwt-key

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Server
PORT=5000
```

### Frontend
Update the base URL in `client/src/services/api.js`:
```javascript
const API_BASE_URL = 'http://localhost:5000/api';  // Development
// const API_BASE_URL = 'https://your-production-api.com/api';  // Production
```

---

## 🚀 How to Run Locally

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account (or local MongoDB)
- Cloudinary account
- Expo CLI installed globally: `npm install -g expo-cli`
- iOS Simulator / Android Emulator / Physical device with Expo Go app

### Backend Setup

1. **Navigate to server directory:**
   ```bash
   cd server
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create `.env` file:**
   ```bash
   cp .env.example .env
   ```
   Then fill in your MongoDB URI, JWT secret, and Cloudinary credentials.

4. **Start the development server:**
   ```bash
   npm run dev
   ```
   Server will run on `http://localhost:5000`

### Frontend Setup

1. **Navigate to client directory:**
   ```bash
   cd client
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start Expo development server:**
   ```bash
   npx expo start
   ```

4. **Run on device/emulator:**
   - Press `a` for Android emulator
   - Press `i` for iOS simulator
   - Scan QR code with Expo Go app on physical device

### Important Notes

⚠️ **Network Configuration:**
- Ensure your mobile device and development machine are on the **same Wi-Fi network**
- Update the API base URL in `client/src/services/api.js` if needed:
  - For physical device: Use your computer's local IP (e.g., `http://192.168.1.x:5000/api`)
  - For emulator: Use `http://localhost:5000/api` or `http://10.0.2.2:5000/api` (Android)

⚠️ **MongoDB Connection:**
- Make sure MongoDB Atlas cluster allows connections from your IP
- Whitelist `0.0.0.0/0` for testing (restrict in production)

---

## 🎯 Future Improvements

### 💳 Payment Integration
- Integrate Razorpay/Stripe for rental payments
- Wallet system for user balance
- Transaction history

### 📡 Real-time Features
- WebSocket integration for live vehicle tracking
- Real-time ride status updates
- Live chat support

### 🔔 Notifications
- Push notifications using Firebase Cloud Messaging
- Ride start/end notifications
- Payment confirmations
- KYC approval alerts

### 👨‍💼 Admin Dashboard
- Web-based admin panel
- User management
- Vehicle fleet management
- Analytics and reporting
- Approve/reject KYC documents

### 🌐 Advanced Features
- Multi-language support
- Dark mode theme
- Ride history and receipts
- Referral system
- In-app feedback system
- SOS/Emergency button

### 🔒 Security Enhancements
- Two-factor authentication (2FA)
- Biometric authentication
- Enhanced document verification (OCR)
- Fraud detection system

---

## 👨‍💻 Author

**Shivansh Mittal**

Full Stack Developer passionate about building scalable mobile and web applications.

- 💼 **LinkedIn:** [Your LinkedIn Profile](#)
- 🐙 **GitHub:** [Your GitHub Profile](#)
- 📧 **Email:** your.email@example.com

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 🙏 Acknowledgments

Built with:
- ❤️ Love for clean code and architecture
- ⚡ Powered by the MERN stack + React Native
- 🎨 Inspired by modern ride-sharing applications
- 🚀 Optimized for performance and scalability

---

## 📞 Support

For support, email your.email@example.com or open an issue in the repository.

---

<div align="center">

**⭐ Star this repository if you find it helpful!**

Made with ❤️ by Shivansh Mittal

</div>
