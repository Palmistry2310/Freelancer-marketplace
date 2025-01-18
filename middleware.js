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
      res.status(401).json({ message: "Authorization headers missing" });
    }

    const token = authHeader.split("Bearer")[1].trim();
    if (!token) {
      res.status(401).json({ message: "Invalid token" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).json({ message: "Invalid JWT token" });
  }
};

const getUserFromJwt = (req, res, next) => {
  const token = req.cookies.token;
  try {
    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    }
    if (req.token === undefined) {
      res.render("401.ejs", { token: req.token });
    }
  } catch {
    res.status(403).json({ message: "Invalid JWT token" });
  }
};

module.exports = {
  getTokenFromCookie,
  verifyJWT,
  getUserFromJwt,
};
