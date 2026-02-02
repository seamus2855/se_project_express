const express = require("express");
const {
  getAllUsers,
  getUser,
  createUser,
  updateUser
} = require("../controllers/users");

const router = express.Router();

router.get("/", getAllUsers);
router.get("/:id", getUser);
router.post("/", createUser);
router.patch("/:id", updateUser);

module.exports = router;
