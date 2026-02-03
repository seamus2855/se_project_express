const mongoose = require("mongoose");
const validator = require("validator");

const { Schema } = mongoose;

const clothingItemSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 30,
  },

  imageUrl: {
    type: String,
    required: true,
    validate: {
      validator: (value) => validator.isURL(value),
      message: "Invalid image URL",
    },
  },

  weather: {
    type: String,
    enum: ["hot", "warm", "cold"],
    required: true,
  },

  owner: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },

  likes: {
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
    ],
    default: [],
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("clothingItem", clothingItemSchema);
