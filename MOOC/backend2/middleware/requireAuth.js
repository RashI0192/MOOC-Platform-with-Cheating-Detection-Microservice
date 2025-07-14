// middleware/requireAuth.js
const jwt = require('jsonwebtoken');

/**
 * Factory that returns a middleware.
 * @param {('student'|'instructor'|null)} requiredRole
 */
module.exports = (requiredRole = null) => {
  return (req, res, next) => {
    const authHeader = req.headers.authorization || '';
    const token = authHeader.startsWith('Bearer ')
      ? authHeader.slice(7)
      : null;

    if (!token) return res.status(401).json({ message: 'No token provided' });

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;                           // { id, role, ... }

      if (requiredRole && decoded.role !== requiredRole) {
        return res.status(403).json({ message: 'Access denied: wrong role' });
      }
      next();
    } catch (err) {
      res.status(401).json({ message: 'Invalid or expired token' });
    }
  };
};
