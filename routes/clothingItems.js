const express = require("express");
const clothingItems = require("../controllers/clothingitems"); // match filename exactly

const router = express.Router();

// Base item routes
router.get("/", clothingItems.getAll);
router.get("/:id", clothingItems.getById);
router.post("/", clothingItems.create);
router.delete("/:id", clothingItems.delete);

// Like / Unlike routes
router.put("/:id/likes", clothingItems.likeItem);
router.delete("/:id/likes", clothingItems.unlikeItem);

module.exports = {
  getAll,
  getById,
  create,
  delete: deleteItem,
  likeItem,
  unlikeItem
};

