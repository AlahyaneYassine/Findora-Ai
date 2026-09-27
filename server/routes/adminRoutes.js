const express = require('express');
const router = express.Router();

const authenticate = require('../middleware/authenticate');
const isAdmin = require('../middleware/isAdmin');
const adminController = require('../controllers/adminController');

// Dashboard Admin (statistiques générales)
router.get('/dashboard', authenticate, isAdmin, adminController.getDashboardStats);

// Liste des utilisateurs
router.get('/users', authenticate, isAdmin, adminController.getAllUsers);

// Modifier le rôle d’un utilisateur
router.patch('/users/:id/role', authenticate, isAdmin, adminController.updateUserRole);

// Bloquer / Débloquer un utilisateur
router.patch('/users/:id/block', authenticate, isAdmin, adminController.toggleUserBlock);

// Supprimer un utilisateur
router.delete('/users/:id', authenticate, isAdmin, adminController.deleteUser);

// Voir le profil complet d’un utilisateur
router.get('/users/:id', authenticate, isAdmin, adminController.getUserProfile);

// Liste des messages de contact
router.get('/messages', authenticate, isAdmin, adminController.getContactMessages);

// Supprimer un message
router.delete('/messages/:id', authenticate, isAdmin, adminController.deleteContactMessage);

// Marquer message lu/non lu
router.patch('/messages/:id/read', authenticate, isAdmin, adminController.toggleMessageRead);



// Répondre à un message
router.post('/messages/:id/reply', authenticate, isAdmin, adminController.replyToMessage);



module.exports = router;
