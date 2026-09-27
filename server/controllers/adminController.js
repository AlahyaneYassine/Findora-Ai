const User = require('../models/User');
const Contact = require('../models/Contact');
const Selection = require('../models/Selection');
const Search = require('../models/Search');

// ---------- STATISTIQUES DASHBOARD ----------
const getDashboardStats = async (req, res) => {
  try {
    const userCount = await User.countDocuments({ role: 'user' });
    const adminCount = await User.countDocuments({ role: 'admin' });
    const contactCount = await Contact.countDocuments();
    const selectionCount = await Selection.countDocuments();
    const searchCount = await Search.countDocuments();

    const latestAdmins = await User.find({ role: 'admin' })
      .sort({ createdAt: -1 })
      .limit(5)
      .select('email createdAt');

    const latestUsers = await User.find({ role: 'user' })
      .sort({ createdAt: -1 })
      .limit(5)
      .select('email createdAt');

    res.json({
      admins: adminCount,
      users: userCount,
      contacts: contactCount,
      selections: selectionCount,
      searches: searchCount,
      latestAdmins,
      latestUsers,
    });
  } catch (err) {
    console.error('Erreur dashboard admin:', err);
    res.status(500).json({ msg: 'Erreur serveur' });
  }
};

// ---------- UTILISATEURS ----------
// Liste des utilisateurs enrichie avec compteurs messages, sélections et recherches
const getAllUsers = async (req, res) => {
  try {
    // Récupérer tous les utilisateurs sans mot de passe
    const users = await User.find().select('-password');

    // Pour chaque utilisateur, compter messages, sélections et recherches
    const usersWithCounts = await Promise.all(
      users.map(async (user) => {
        const messagesCount = await Contact.countDocuments({ email: user.email });
        const selectionsCount = await Selection.countDocuments({ user: user._id });
        const searchesCount = await Search.countDocuments({ userId: user._id });

        return {
          ...user.toObject(),
          messagesCount,
          selectionsCount,
          searchesCount,
        };
      })
    );

    res.json(usersWithCounts);
  } catch (err) {
    console.error('Erreur récupération utilisateurs avec compteurs:', err);
    res.status(500).json({ msg: 'Erreur serveur' });
  }
};

const updateUserRole = async (req, res) => {
  const { role } = req.body;
  if (!['user', 'admin'].includes(role)) {
    return res.status(400).json({ msg: 'Rôle invalide' });
  }

  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role },
      { new: true }
    ).select('-password');

    if (!user) return res.status(404).json({ msg: 'Utilisateur introuvable' });

    res.json({ msg: 'Rôle mis à jour', user });
  } catch (err) {
    console.error('Erreur changement rôle:', err);
    res.status(500).json({ msg: 'Erreur serveur' });
  }
};

const toggleUserBlock = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ msg: 'Utilisateur introuvable' });

    user.isBlocked = !user.isBlocked;
    await user.save();

    res.json({ msg: `Utilisateur ${user.isBlocked ? 'bloqué' : 'débloqué'}`, user });
  } catch (err) {
    console.error('Erreur blocage utilisateur:', err);
    res.status(500).json({ msg: 'Erreur serveur' });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ msg: 'Utilisateur introuvable' });

    res.json({ msg: 'Utilisateur supprimé', user });
  } catch (err) {
    console.error('Erreur suppression utilisateur:', err);
    res.status(500).json({ msg: 'Erreur serveur' });
  }
};

const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ msg: 'Utilisateur introuvable' });

    const selections = await Selection.find({ user: user._id });
    const searches = await Search.find({ user: user._id });

    res.json({ user, selections, searches });
  } catch (err) {
    console.error('Erreur récupération profil utilisateur:', err);
    res.status(500).json({ msg: 'Erreur serveur' });
  }
};

// ---------- MESSAGES ----------
const getContactMessages = async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    console.error('Erreur récupération messages:', err);
    res.status(500).json({ msg: 'Erreur serveur' });
  }
};

const deleteContactMessage = async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Message supprimé' });
  } catch (err) {
    console.error('Erreur suppression message:', err);
    res.status(500).json({ msg: 'Erreur serveur' });
  }
};

const toggleMessageRead = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ msg: 'Message non trouvé' });

    contact.isRead = !contact.isRead;
    await contact.save();

    res.json({ msg: `Message marqué comme ${contact.isRead ? 'lu' : 'non lu'}` });
  } catch (err) {
    console.error('Erreur mise à jour lecture message:', err);
    res.status(500).json({ msg: 'Erreur serveur' });
  }
};

// Fonction unique pour répondre à un message de contact
const replyToMessage = async (req, res) => {
  try {
    const { reply } = req.body;
    const contact = await Contact.findById(req.params.id);

    if (!contact) return res.status(404).json({ msg: 'Message non trouvé' });

    contact.reply = reply;
    contact.repliedAt = new Date();
    contact.isRead = true; // On considère qu’un message répondu est lu
    await contact.save();

    res.json({ msg: 'Réponse envoyée', contact });
  } catch (err) {
    console.error('Erreur lors de la réponse au message:', err);
    res.status(500).json({ msg: 'Erreur serveur' });
  }
};

// ---------- EXPORTS ----------
module.exports = {
  getDashboardStats,
  getAllUsers,
  updateUserRole,
  toggleUserBlock,
  deleteUser,
  getUserProfile,
  getContactMessages,
  deleteContactMessage,
  toggleMessageRead,
  replyToMessage,
};
