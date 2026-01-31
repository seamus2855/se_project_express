const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: [true, "The avatar field is required."],
    validate: function (value) {
      return validator.isURL(value);
    },
    message: "Please provide a valid URL",
  },
});

module.exports = mongoose.model("user", userSchema);
