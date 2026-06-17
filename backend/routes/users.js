const express = require("express");
const { getCurrentUser, updateCurrentUser } = require("../controllers/users");
const { validateUserUpdate } = require("../middlewares/validation"); 
const auth = require("../middlewares/auth"); // Imported locally for bulletproof protection

const router = express.Router();

// Get the currently authenticated user — Resolves to: GET /users/me
router.get("/me", auth, getCurrentUser);

// Update the current user — Secure payload verification — Resolves to: PATCH /users/me
router.patch("/me", auth, validateUserUpdate, updateCurrentUser);

module.exports = router;
