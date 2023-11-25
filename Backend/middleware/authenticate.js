// middleware function to authenticate users using JWT
const jwt = require('jsonwebtoken');
const secretKey = 'your-secret-key'; // Replace with a secure secret key

function authenticate(req, res, next) {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
}

module.exports = authenticate;
