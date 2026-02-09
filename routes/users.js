const express = require("express");
const { getCurrentUser, updateUser } = require("../controllers/users");

const router = express.Router();

// Get the currently authenticated user
router.get("/me", getCurrentUser);

// Update the current user
router.patch("/:id", updateUser);

module.exports = router;
