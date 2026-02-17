const router = require("express").Router();
const auth = require("../middlewares/auth");

const userRouter = require("./users");
const itemsRouter = require("./clothingItems");
const { login, createUser } = require("../controllers/users");
const { getAll } = require("../controllers/clothingItems");

// Public routes
router.post("/signin", login);
router.post("/signup", createUser);
router.get("/items", getAll); // ✔ ONLY getAll is public

// Protect everything below this line
router.use(auth);

// Protected routes
router.use("/users", userRouter);
router.use("/items", itemsRouter); // ✔ all other item routes protected

module.exports = router;
