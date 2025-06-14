const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

module.exports = (roles = []) => {
  return async (req, res, next) => {
    const authHeader = req.headers.authorization;
    console.log('🔐 Authorization Header:', authHeader);

    if (!authHeader) return res.status(401).json({ error: 'No token' });

    const token = authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Malformed token' });

    try {
      console.log("My token is: ", token, " secret is: ", JWT_SECRET);
      console.log(jwt.verify(token, JWT_SECRET));
      const payload = jwt.verify(token, JWT_SECRET);
      console.log('✅ Token Payload:', payload);
      req.user = payload;

      if (roles.length && !roles.includes(payload.role)) {
        console.log('⛔ Role not allowed:', payload.role);
        return res.status(403).json({ error: 'Forbidden' });
      }

      next();
    } catch (err) {
      console.log('❌ JWT Verification Error:', err.message);
      res.status(401).json({ error: 'Invalid token' });
    }
  };
};


module.exports = (roles = []) => {
  return (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: 'No token' });
    const token = authHeader.split(' ')[1];
    try {
      const payload = jwt.verify(token, JWT_SECRET);
      req.user = payload;
      if (roles.length && !roles.includes(payload.role)) {
        return res.status(403).json({ error: 'Forbidden' });
      }
      next();
    } catch {
      res.status(401).json({ error: 'Invalid token' });
    }
  };
};

