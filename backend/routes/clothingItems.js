const express = require("express");
const clothingItems = require("../controllers/clothingItems");
const auth = require("../middlewares/auth"); // Required for protecting write operations
const { validateClothingItem, validateIdParam } = require("../middlewares/validation"); // Added validation hooks

// Enables parent URL wildcards and parameters to pass safely down to child hooks
const router = express.Router({ mergeParams: true });

// ==========================================
// 1. PUBLIC ROUTE (No authorization required)
// ==========================================
// Resolves directly to: GET /items (Fixes the frontend 404 crash on page load)
router.get("/", clothingItems.getAll); 

// ==========================================
// 2. PROTECTED ROUTES (Requires valid auth token)
// ==========================================
// Base item routes with request schema validation
router.post("/", auth, validateClothingItem, clothingItems.create);

// Extracted via bracket notation to safely bypass JavaScript's reserved 'delete' keyword rule
router.delete("/:id", auth, validateIdParam, clothingItems["delete"]);

// Like / Unlike routes with parameter schema validation
router.put("/:id/likes", auth, validateIdParam, clothingItems.likeItem);
router.delete("/:id/likes", auth, validateIdParam, clothingItems.unlikeItem);

module.exports = router;
