const express = require("express");
const { getCurrentUser, updateCurrentUser } = require("../controllers/users");

const router = express.Router();

// Get the currently authenticated user
router.get("/me", getCurrentUser);

// Update the current user
router.patch("/me", updateCurrentUser);

module.exports = router;
