const router = require("express").Router();
const usersRouter = require("./users");
const { login, createUser } = require("../controllers/users");
const { validateUserBody, validateAuthentication } = require("../middlewares/validation");
const { NotFoundError } = require("../utils/errors"); // Swapped out NOT_FOUND constant for the custom Error Class
const clothingItemsRouter = require("./clothingItems");

// ==========================================
// 1. PUBLIC AUTHENTICATION ENDPOINTS
// ==========================================
router.post("/signin", validateAuthentication, login);
router.post("/signup", validateUserBody, createUser);

// ==========================================
// 2. RESOURCE ROUTING MOUNTS
// ==========================================
router.use("/items", clothingItemsRouter);
router.use("/users", usersRouter);

// ==========================================
// 3. CATCH-ALL WILD CARD 404
// ==========================================
// Fixed: Switched from a direct response to centralized error handling
router.use((req, res, next) => {
  return next(new NotFoundError("Requested resource not found"));
});

module.exports = router;
