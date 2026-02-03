const router = require("express").Router();

const userRouter = require("./users");
const itemsRouter = require("./clothingitems");

// Mount routers
router.use("/users", userRouter);
router.use("/items", itemsRouter);

module.exports = router;
