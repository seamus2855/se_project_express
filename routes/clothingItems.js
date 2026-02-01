const express = require("express");
const clothingItems = require("../controllers/clothingitems"); // Ensure this file exports getAll, getById, create, update, delete

const router = express.Router();

// GET /items — fetch all clothing items
router.get("/", clothingItems.getAll);

// GET /items/:id — fetch a single item by ID
router.get("/:id", clothingItems.getById);

// POST /items — create a new item
router.post("/", clothingItems.create);

// PUT /items/:id — replace/update an item fully
router.put("/:id", clothingItems.update);

// DELETE /items/:id — remove an item
router.delete("/:id", clothingItems.delete);

module.exports = router;
