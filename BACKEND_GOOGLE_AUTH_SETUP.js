// ============================================================
// BACKEND CODE - Add this to your Daraz-Backend project
// ============================================================

// -----------------------------------------------
// STEP 1: Install firebase-admin in your backend
// -----------------------------------------------
// Run: npm install firebase-admin

// -----------------------------------------------
// STEP 2: Add to your backend .env file
// -----------------------------------------------
// FIREBASE_PROJECT_ID = your_project_id
// FIREBASE_CLIENT_EMAIL = your_client_email_from_service_account
// FIREBASE_PRIVATE_KEY = "your_private_key_from_service_account"

// -----------------------------------------------
// STEP 3: Create firebase admin config
// File: config/firebaseAdmin.js
// -----------------------------------------------
/*
const admin = require('firebase-admin');

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  }),
});

module.exports = admin;
*/

// -----------------------------------------------
// STEP 4: Add this function to your authController.js
// -----------------------------------------------
/*
const admin = require('../config/firebaseAdmin');

// @desc    Google Login/Register
// @route   POST /api/auth/google
// @access  Public
exports.googleLogin = asyncHandler(async (req, res, next) => {
  const { idToken } = req.body;

  if (!idToken) {
    return next(new ErrorResponse('Google ID token is required', 400));
  }

  // Verify the Firebase ID token
  let decodedToken;
  try {
    decodedToken = await admin.auth().verifyIdToken(idToken);
  } catch (error) {
    return next(new ErrorResponse('Invalid Google token', 401));
  }

  const { email, name, picture } = decodedToken;

  // Check if user exists
  let user = await User.findOne({ email });

  if (user) {
    // User exists - update last login
    if (!user.isActive) {
      return next(new ErrorResponse('Your account has been deactivated. Contact support.', 401));
    }
    user.lastLogin = Date.now();
    await user.save({ validateBeforeSave: false });
  } else {
    // New user - create account
    user = await User.create({
      name: name || email.split('@')[0],
      email,
      password: crypto.randomBytes(32).toString('hex'), // Random password for Google users
      avatar: picture || undefined,
      role: 'customer',
      isGoogleUser: true, // Optional: add this field to your User model
    });

    // Send welcome email
    try {
      await sendEmail({ to: email, ...emailTemplates.welcomeEmail(user.name) });
    } catch (err) {
      console.error('Welcome email failed:', err.message);
    }
  }

  sendTokenResponse(user, 200, res, 'Google login successful');
});
*/

// -----------------------------------------------
// STEP 5: Add route to your authRoutes.js
// -----------------------------------------------
/*
const { googleLogin } = require('../controllers/authController');
router.post('/google', googleLogin);
*/

// -----------------------------------------------
// STEP 6 (Optional): Add isGoogleUser field to User model
// -----------------------------------------------
/*
// In your User model (models/User.js), add this field:
isGoogleUser: {
  type: Boolean,
  default: false,
},
*/
