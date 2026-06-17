const router = require("express").Router();
const usersRouter = require("./users");
const itemsRouter = require("./clothingItems");
const { login, createUser } = require("../controllers/users");
const { validateUserBody, validateAuthentication } = require("../middlewares/validation"); // Added Joi validation imports
const { NOT_FOUND } = require("../utils/errors");

// ==========================================
// 1. PUBLIC AUTHENTICATION ENDPOINTS
// ==========================================
// Secured with automated Celebrate body validation checks
router.post("/signin", validateAuthentication, login);
router.post("/signup", validateUserBody, createUser);

// ==========================================
// 2. RESOURCE ROUTING MOUNTS
// ==========================================
// Passes routing down to sub-routers which handle their own public vs. private endpoints cleanly
router.use("/items", clothingItemsRouter);
router.use("/users", usersRouter); // Fixed: Removed duplicate global 'auth' middleware layer

// ==========================================
// 3. CATCH-ALL WILD CARD 404
// ==========================================
router.use((req, res) => {
  return res.status(NOT_FOUND).json({ message: "Requested resource not found" });
});

module.exports = router;
