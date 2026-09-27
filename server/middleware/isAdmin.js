module.exports = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    console.log('✅ Accès admin autorisé pour:', req.user.role);
    return next();
  } else {
    console.warn('⛔ Accès refusé. Rôle:', req.user?.role);
    return res.status(403).json({ message: 'Accès refusé : admin uniquement' });
  }
};
