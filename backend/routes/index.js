const router = require("express").Router();
const usersRouter = require("./users");
const clothingItemsRouter = require("./clothingItems");
const auth = require("../middlewares/auth"); // Added authentication middleware

const { login, createUser } = require("../controllers/users");
const { validateUserBody, validateAuthentication } = require("../middlewares/validation");
const { NotFoundError } = require("../utils/errors");

// ==========================================
// 1. PUBLIC AUTHENTICATION ENDPOINTS
// ==========================================
router.post("/signin", validateAuthentication, login);
router.post("/signup", validateUserBody, createUser);

// ==========================================
// 2. RESOURCE ROUTING MOUNTS
// ==========================================
// Allow public read access inside the router, but guard deletions/creations with auth
router.use("/items", clothingItemsRouter); 
router.use("/users", auth, usersRouter); // Protect user routes

// ==========================================
// 3. CATCH-ALL WILD CARD 404
// ==========================================
router.use((req, res, next) => {
  return next(new NotFoundError("Requested resource not found"));
});

module.exports = router;
