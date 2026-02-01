const Item = require("../models/clothingItem");

// GET /items — fetch all clothing items
exports.getAll = async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// GET /items/:id — fetch a single item by ID
exports.getById = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.json(item);
  } catch (err) {
    res.status(400).json({ message: "Invalid ID format" });
  }
};

// POST /items — create a new item
exports.create = async (req, res) => {
  try {
    const newItem = await Item.create(req.body);
    res.status(201).json(newItem);
  } catch (err) {
    res.status(400).json({ message: "Invalid data" });
  }
};

// PUT /items/:id — update/replace an item
exports.update = async (req, res) => {
  try {
    const updatedItem = await Item.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedItem) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.json(updatedItem);
  } catch (err) {
    res.status(400).json({ message: "Invalid data or ID format" });
  }
};

// DELETE /items/:id — remove an item
exports.delete = async (req, res) => {
  try {
    const deletedItem = await Item.findByIdAndDelete(req.params.id);

    if (!deletedItem) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.json({ message: "Item deleted" });
  } catch (err) {
    res.status(400).json({ message: "Invalid ID format" });
  }
};
