// middleware/auth.js
const jwt = require("jsonwebtoken");
const { UNAUTHORIZED } = require("../utils/errors"); // Aligned with your project's error structure
const { JWT_SECRET } = require("../utils/config");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  // 1. Verify token presence and structure
  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res
      .status(UNAUTHORIZED)
      .json({ message: "Authorization required" });
  }

  const token = authorization.replace("Bearer ", "");

  try {
    // 2. Verify token validity
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    return next();
  } catch (err) {
    // 3. Handle invalid token
    return res
      .status(UNAUTHORIZED)
      .json({ message: "Authorization required" });
  }
};
