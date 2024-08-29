const jwt = require('jsonwebtoken');

const SECRET_KEY = '3c8c15426b5f951bb32507d9e64f333cb33513fbdd175dc4747338018b0e91df'; 

const authenticate = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).json({ message: 'Invalid token.' });
  }
};

module.exports = authenticate;