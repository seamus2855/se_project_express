const Item = require("../models/clothingItems");
// Import the official Sprint 15 custom error classes explicitly
const { BadRequestError, NotFoundError, ForbiddenError } = require("../errors");

// ==========================================
// 1. GET / — Fetch All Clothing Items
// ==========================================
exports.getAll = async (req, res, next) => {
  try {
    const items = await Item.find();
    return res.status(200).json(items);
  } catch (err) {
    return next(err);
  }
};

// ==========================================
// 2. POST / — Create a New Clothing Item
// ==========================================
exports.create = async (req, res, next) => {
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
      return next(new BadRequestError("Invalid clothing item data provided"));
    }
    return next(err);
  }
};

// ==========================================
// 3. DELETE /:id — Remove an Item with Owner Verification
// ==========================================
exports.delete = async (req, res, next) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      throw new NotFoundError("Item not found");
    }

    // Ownership verification check
    if (item.owner.toString() !== req.user._id.toString()) {
      throw new ForbiddenError("You cannot delete another user's item");
    }

    await item.deleteOne();
    return res.status(200).json({ message: "Item deleted successfully" });
  } catch (err) {
    if (err.name === "CastError") {
      return next(new BadRequestError("Invalid ID format"));
    }
    return next(err);
  }
};

// ==========================================
// 4. PUT /:id/likes — Add a User Like to an Item
// ==========================================
exports.likeItem = async (req, res, next) => {
  try {
    const updatedItem = await Item.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { likes: req.user._id } },
      { new: true }
    );
    if (!updatedItem) {
      throw new NotFoundError("Item not found");
    }
    return res.status(200).json(updatedItem);
  } catch (err) {
    if (err.name === "CastError") {
      return next(new BadRequestError("Invalid ID format"));
    }
    return next(err);
  }
};

// ==========================================
// 5. DELETE /:id/likes — Remove a User Like from an Item
// ==========================================
exports.unlikeItem = async (req, res, next) => {
  try {
    const updatedItem = await Item.findByIdAndUpdate(
      req.params.id,
      { $pull: { likes: req.user._id } },
      { new: true }
    );
    if (!updatedItem) {
      throw new NotFoundError("Item not found");
    }
    return res.status(200).json(updatedItem);
  } catch (err) {
    if (err.name === "CastError") {
      return next(new BadRequestError("Invalid ID format"));
    }
    return next(err);
  }
};
