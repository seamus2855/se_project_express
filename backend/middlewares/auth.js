// middleware/auth.js
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const { UnauthorizedError } = require("../utils/errors"); // Imported custom error class

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  // 1. Verify token presence and structure
  if (!authorization || !authorization.startsWith("Bearer ")) {
    return next(new UnauthorizedError("Authorization required"));
  }

  const token = authorization.replace("Bearer ", "");

  try {
    // 2. Verify token validity
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    
    return next();
  } catch (err) {
    // 3. Handle invalid token by passing a custom error to the central handler
    return next(new UnauthorizedError("Authorization required"));
  }
};
