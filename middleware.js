const jwt = require("jsonwebtoken");

const getTokenFromCookie = (req, res, next) => {
  const token = req.cookies.token;
  if (token) {
    req.token = token;
  } else {
    req.token = undefined;
  }
  next();
};

const verifyJWT = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: "Authorization headers missing" });
    }

    const token = authHeader.split("Bearer")[1];
    if (!token || !token.trim()) {
      return res.status(401).json({ message: "Invalid token" });
    }

    const decoded = jwt.verify(token.trim(), process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid JWT token" });
  }
};

module.exports = {
  getTokenFromCookie,
  verifyJWT,
};
