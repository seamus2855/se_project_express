const express = require("express");
const { updateUser } = require("../controllers/users");

const router = express.Router();

// Only allow updating the current user
router.patch("/:id", updateUser);

module.exports = router;
