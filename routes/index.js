const router = require("express").Router();

const userRouter = require("./users");
const itemsRouter = require("./clothingitems"); // match filename exactly

// Mount routers
router.use("/users", userRouter);
router.use("/items", itemsRouter);

module.exports = router;
