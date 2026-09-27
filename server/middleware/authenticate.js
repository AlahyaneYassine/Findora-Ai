const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Vérifie la présence du header et son format
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    console.log('⛔ Pas de header Authorization ou format invalide');
    return res.status(401).json({ msg: 'Token manquant ou mal formaté' });
  }

  const token = authHeader.split(' ')[1];
  console.log('🔐 Token reçu:', token);

  try {
    const secret = process.env.JWT_SECRET || 'fallbacksecret';
    const decoded = jwt.verify(token, secret);

    console.log('✅ Token décodé:', decoded);

    // Stocke les infos décodées pour les prochaines middlewares/routes
    req.user = {
      id: decoded.userId,
      role: decoded.role,
      email: decoded.email, // facultatif si tu le stockes dans le token
    };

    next(); // passe à la suite (ex: route protégée)
  } catch (err) {
    console.log('❌ JWT verify error:', err.message);
    return res.status(403).json({ msg: 'Token invalide ou expiré' });
  }
};

module.exports = authenticate;
