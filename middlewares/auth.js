const jwt = require("jsonwebtoken");
const { UNAUTHORIZED } = require("../../utils/errors");
const { JWT_SECRET } = require("../../utils/config");
 
module.exports = (req, res, next) => {
  const { authorization } = req.headers;
 
  // Expect header: Authorization: Bearer <token>
  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res
      .status(UNAUTHORIZED)
      .json({ message: "Authorization required" });
  }
 
  const token = authorization.replace("Bearer ", "");
 
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload; // now req.user._id is available
    next();
  } catch (err) {
    return res
      .status(UNAUTHORIZED)
      .json({ message: "Invalid or expired token" });
  }
};
 