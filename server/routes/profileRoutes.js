// routes/profile.js
const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const profileCtrl = require('../controllers/profileController');

// Upload setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = path.join(__dirname, '..', 'uploads');
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});


// ✅ File filter to allow only images
const fileFilter = (req, file, cb) => {
  const allowed = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
  if (allowed.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('❌ Invalid file type. Only JPEG, PNG, JPG, or WEBP allowed.'), false);
  }
};



const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
  fileFilter // <--- add this here
});
// Routes
router.get('/me', authenticate, profileCtrl.getProfile);
router.put('/update', authenticate, upload.single('avatar'), profileCtrl.updateProfile);
router.put('/change-password', authenticate, profileCtrl.changePassword);
router.put('/change-email', authenticate, profileCtrl.changeEmail);
router.delete('/delete', authenticate, profileCtrl.deleteAccount);
// Error handler for Multer file upload
router.use((err, req, res, next) => {
  if (err instanceof multer.MulterError || err.message.includes('Invalid file type')) {
    return res.status(400).json({ msg: err.message });
  }
  next(err);
});
router.get('/user/:userId', authenticate, profileCtrl.getProfileByUserId);
router.get('/download/:userId', authenticate, profileCtrl.downloadProfilePDF);
module.exports = router;
