const Profile = require('../models/Profile');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit');

// === Get Profile ===
exports.getProfile = async (req, res) => {
  try {
    let profile = await Profile.findOne({ user: req.user.id }).populate('user', 'email createdAt');

    if (!profile) {
      profile = new Profile({ user: req.user.id });
      await profile.save();
      profile = await profile.populate('user', 'email createdAt');
    }

    res.json(profile);
  } catch (err) {
    console.error('Error fetching profile:', err);
    res.status(500).json({ msg: 'Error fetching profile' });
  }
};

exports.downloadProfilePDF = async (req, res) => {
  try {
    const userId = req.params.userId;
    const profile = await Profile.findOne({ user: userId }).populate('user', 'email createdAt');

    if (!profile) return res.status(404).json({ msg: "Profil non trouvé" });

    const doc = new PDFDocument();
    res.setHeader('Content-Disposition', `attachment; filename=profile_${userId}.pdf`);
    res.setHeader('Content-Type', 'application/pdf');

    doc.pipe(res);

    doc.fontSize(20).text(`Profil de ${profile.firstName || ''} ${profile.lastName || ''}`, { underline: true });
    doc.moveDown();
    doc.fontSize(14).text(`Email: ${profile.user.email}`);
    doc.text(`Créé le: ${profile.user.createdAt.toDateString()}`);
    doc.text(`Adresse: ${profile.address || 'N/A'}`);
    doc.text(`Téléphone: ${profile.phone || 'N/A'}`);
    doc.text(`Bio: ${profile.bio || 'N/A'}`);

    doc.end();
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Erreur serveur" });
  }
};

// === Update Profile ===
exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const profile = await Profile.findOne({ user: userId });
    if (!profile) return res.status(404).json({ msg: 'Profil non trouvé' });

    // Vérifie si 15 jours se sont écoulés
    const now = new Date();
    const lastUpdate = profile.lastProfileUpdate || new Date(0); // par défaut: 1970
    const diffInDays = Math.floor((now - lastUpdate) / (1000 * 60 * 60 * 24));

    if (diffInDays < 15) {
      const daysRemaining = 15 - diffInDays;
      return res.status(403).json({
        msg: `Vous pouvez modifier votre profil à nouveau dans ${daysRemaining} jour(s).`,
      });
    }

    const { firstName, lastName, address, phone, bio } = req.body;

    if (firstName) profile.firstName = firstName;
    if (lastName) profile.lastName = lastName;
    if (address) profile.address = address;
    if (phone) profile.phone = phone;
    if (bio) profile.bio = bio;

    // Gérer l'avatar
    if (req.file) {
      // Supprimer l'ancien avatar si existe
      if (profile.avatar) {
        const oldPath = path.join(__dirname, '..', 'uploads', profile.avatar);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
      profile.avatar = req.file.filename;
    }

    // Mettre à jour la date de mise à jour
    profile.lastProfileUpdate = now;

    await profile.save();

    res.json({ msg: 'Profil mis à jour avec succès', profile });
  } catch (err) {
    console.error('Erreur mise à jour profil:', err);
    res.status(500).json({ msg: 'Erreur serveur' });
  }
};

// === Change Password ===
exports.changePassword = async (req, res) => {
  const { newPassword } = req.body;
  try {
    const user = await User.findById(req.user.id);
    // On ne vérifie plus le mot de passe actuel

    const hashed = await bcrypt.hash(newPassword, 10);
    user.password = hashed;
    await user.save();

    res.json({ msg: 'Password changed' });
  } catch (err) {
    console.error('Error changing password:', err);
    res.status(500).json({ msg: 'Server error' });
  }
};

// === Get Profile by User ID (admin only) ===
exports.getProfileByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId).select('-password');
    if (!user) {
      return res.status(404).json({ msg: "Utilisateur introuvable" });
    }

    let profile = await Profile.findOne({ user: userId }).populate('user', 'email createdAt');

    if (!profile) {
      profile = new Profile({ user: userId });
      await profile.save();
      profile = await profile.populate('user', 'email createdAt');
    }

    res.json(profile);
  } catch (err) {
    console.error('Erreur lors de la récupération du profil par ID utilisateur :', err);
    res.status(500).json({ msg: 'Erreur serveur' });
  }
};

// === Change Email ===
exports.changeEmail = async (req, res) => {
  const { newEmail } = req.body;

  const allowedDomains = /@(gmail\.com|yahoo\.com|outlook\.com)$/i;

  try {
    if (!newEmail) {
      return res.status(400).json({ msg: 'New email is required' });
    }

    if (!allowedDomains.test(newEmail)) {
      return res.status(400).json({ msg: 'Email must be from gmail.com, yahoo.com, or outlook.com' });
    }

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ msg: 'User not found' });

    const exists = await User.findOne({ email: newEmail });
    if (exists && exists._id.toString() !== req.user.id) {
      return res.status(400).json({ msg: 'Email already in use' });
    }

    user.email = newEmail;
    await user.save();

    res.json({ msg: 'Email changed' });
  } catch (err) {
    console.error('Error changing email:', err);
    res.status(500).json({ msg: 'Server error' });
  }
};

// === Delete Account ===
exports.deleteAccount = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findById(req.user.id);
    if (user.email !== email) return res.status(400).json({ msg: 'Email mismatch' });

    // Suppression de la vérification du mot de passe

    const profile = await Profile.findOne({ user: req.user.id });
    if (profile && profile.avatar) {
      const avatarPath = path.join(__dirname, '..', 'uploads', profile.avatar);
      if (fs.existsSync(avatarPath)) fs.unlinkSync(avatarPath);
    }

    await Profile.deleteOne({ user: req.user.id });
    await User.findByIdAndDelete(req.user.id);

    res.json({ msg: 'Account deleted' });
  } catch (err) {
    console.error('Error deleting account:', err);
    res.status(500).json({ msg: 'Server error' });
  }
};
