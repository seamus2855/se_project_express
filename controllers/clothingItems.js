const Item = require("../models/clothingItems");

const {
  BAD_REQUEST,
  NOT_FOUND,
  INTERNAL_SERVER_ERROR,
} = require("../utils/errors");

// GET / — fetch all clothing items
exports.getAll = async (req, res) => {
  try {
    const items = await Item.find();
    return res.json(items);
  } catch (err) {
    return res
      .status(INTERNAL_SERVER_ERROR)
      .json({ message: "An error has occurred on the server." });
  }
};

// POST / — create a new item
exports.create = async (req, res) => {
  try {
    const { name, imageUrl, weather } = req.body;

    const newItem = await Item.create({
      name,
      imageUrl,
      weather,
      owner: req.user._id,
    });

    return res.status(201).json(newItem);
  } catch (err) {
    if (err.name === "ValidationError") {
      return res.status(BAD_REQUEST).json({ message: "Invalid data" });
    }

    return res
      .status(INTERNAL_SERVER_ERROR)
      .json({ message: "An error has occurred on the server." });
  }
};

// DELETE /:id — remove an item (with ownership check)
exports.delete = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(NOT_FOUND).json({ message: "Item not found" });
    }

    // Ownership check
    if (item.owner.toString() !== req.user._id) {
      return res
        .status(403)
        .json({ message: "Forbidden: You cannot delete another user's item" });
    }

    await item.deleteOne();

    return res.json({ message: "Item deleted" });
  } catch (err) {
    if (err.name === "CastError") {
      return res.status(BAD_REQUEST).json({ message: "Invalid ID format" });
    }

    return res
      .status(INTERNAL_SERVER_ERROR)
      .json({ message: "An error has occurred on the server." });
  }
};

// PUT /:id/likes — like an item
exports.likeItem = async (req, res) => {
  try {
    const updatedItem = await Item.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { likes: req.user._id } },
      { new: true }
    );

    if (!updatedItem) {
      return res.status(NOT_FOUND).json({ message: "Item not found" });
    }

    return res.json(updatedItem);
  } catch (err) {
    if (err.name === "CastError") {
      return res.status(BAD_REQUEST).json({ message: "Invalid ID format" });
    }

    return res
      .status(INTERNAL_SERVER_ERROR)
      .json({ message: "An error has occurred on the server." });
  }
};

// DELETE /:id/likes — unlike an item
exports.unlikeItem = async (req, res) => {
  try {
    const updatedItem = await Item.findByIdAndUpdate(
      req.params.id,
      { $pull: { likes: req.user._id } },
      { new: true }
    );

    if (!updatedItem) {
      return res.status(NOT_FOUND).json({ message: "Item not found" });
    }

    return res.json(updatedItem);
  } catch (err) {
    if (err.name === "CastError") {
      return res.status(BAD_REQUEST).json({ message: "Invalid ID format" });
    }

    return res
      .status(INTERNAL_SERVER_ERROR)
      .json({ message: "An error has occurred on the server." });
  }
};
