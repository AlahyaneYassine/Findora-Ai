const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const multer = require('multer');
const path = require('path');
const User = require('../models/User');
const authenticate = require('../middleware/authenticate');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,       // ton email Gmail
    pass: process.env.EMAIL_PASS        // mot de passe d'application
  }
});


// Multer setup for avatar uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const filename = `${req.user.id}-${Date.now()}${ext}`;
    cb(null, filename);
  }
});
const upload = multer({ storage });


// ========== AUTH ==========

// 🔒 Signup
router.post('/signup', async (req, res) => {
  const { email, password } = req.body;

  // Validation des domaines autorisés
  const allowedDomains = /@(gmail\.com|yahoo\.com|outlook\.com)$/i;
  if (!allowedDomains.test(email)) {
    return res.status(400).json({ msg: 'Email must be from gmail.com, yahoo.com, or outlook.com' });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ msg: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword });
    await user.save();

    res.status(201).json({ msg: 'User created successfully' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});


// 🔐 Login with block check
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'User not found' });

    // 🔴 Check if user is blocked
    if (user.isBlocked) {
      return res.status(403).json({ msg: 'Your account has been blocked. Verification Purpose.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET || 'fallbacksecret',
      { expiresIn: '1h' }
    );

    res.json({
      token,
      user: {
        _id: user._id,
        email: user.email,
        role: user.role,
      }
    });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});


// 🔐 Login / Signup via Google
router.post('/google-login', async (req, res) => {
  console.log('Body reçu dans /google-login:', req.body);
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ msg: 'Google token is missing' });
  }

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email, name, picture, sub: googleId } = payload;

    let user = await User.findOne({ email });

    if (!user) {
      user = new User({
        email,
        googleId,
        name,
        avatar: picture,
      });
      await user.save();
    }

    const jwtToken = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET || 'fallbacksecret',
      { expiresIn: '1h' }
    );

    res.json({
      token: jwtToken,
      user: {
        _id: user._id,
        email: user.email,
        role: user.role,
        name: user.name,
        avatar: user.avatar,
      }
    });

  } catch (error) {
    console.error('Google login error:', error);
    res.status(401).json({ msg: 'Invalid Google token' });
  }
});


// 🔍 Get current user
router.get('/me', authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ msg: 'User not found' });

    res.json(user);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});


// POST /api/auth/admin-login
router.post('/admin-login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'User not found' });

    // Vérifier que c’est bien un admin
    if (user.role !== 'admin') {
      return res.status(403).json({ msg: 'Access denied: not an admin' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET || 'fallbacksecret',
      { expiresIn: '1h' }
    );

    res.json({
      token,
      user: {
        _id: user._id,
        email: user.email,
        role: user.role,
      }
    });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});























// 🔁 Forgot password
router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'User not found' });

    const resetToken = crypto.randomBytes(32).toString('hex');
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000;
    await user.save();

    const resetUrl = `http://localhost:3000/reset-password?token=${resetToken}`;

await transporter.sendMail({
  from: `"Findora Support" <${process.env.EMAIL_USER}>`,
  to: user.email,
  subject: "Password Reset Request",
  html: `
    <p>Hello,</p>
    <p>You have requested to reset your password.</p>
    <p>Click here to continue : <a href="${resetUrl}">${resetUrl}</a></p>
    <p>This link will expire in 1 hour.</p>
  `
});


    res.json({ msg: 'Password reset token generated. Check your email.' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// 🔁 Reset password
router.post('/reset-password', async (req, res) => {
  const { token, newPassword } = req.body;
  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) return res.status(400).json({ msg: 'Invalid or expired token' });

    user.password = await bcrypt.hash(newPassword, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.json({ msg: 'Password has been reset successfully' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// ✏️ Update profile (with avatar + password check)
router.put('/me', authenticate, upload.single('avatar'), async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ msg: 'User not found' });

    const { firstName, lastName, address, phone, bio, currentPassword } = req.body;

    if (!currentPassword) {
      return res.status(400).json({ msg: 'Current password is required' });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Incorrect current password' });
    }

    if (firstName !== undefined) user.firstName = firstName;
    if (lastName !== undefined) user.lastName = lastName;
    if (address !== undefined) user.address = address;
    if (phone !== undefined) user.phone = phone;
    if (bio !== undefined) user.bio = bio;
    if (req.file) user.avatar = req.file.filename;

    await user.save();
    const updatedUser = await User.findById(req.user.id).select('-password');
    res.json(updatedUser);
  } catch (err) {
    console.error('Error updating profile:', err);
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
