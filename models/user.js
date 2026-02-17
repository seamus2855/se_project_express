const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 30,
    },

    avatar: {
      type: String,
      required: true,
      validate: {
        validator: (value) => validator.isURL(value),
        message: "Avatar must be a valid URL",
      },
    },

    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (value) => validator.isEmail(value),
        message: "Email must be a valid email address",
      },
    },

    password: {
      type: String,
      required: true,
      select: false,
    },
  },
  { versionKey: false }
);

// STATIC METHOD — required for login
userSchema.statics.findUserByCredentials = async function (email, password) {
  const user = await this.findOne({ email }).select("+password");

  if (!user) {
    throw new Error("Incorrect email or password");
  }

  const matched = await bcrypt.compare(password, user.password);

  if (!matched) {
    throw new Error("Incorrect email or password");
  }

  return user;
};

module.exports = mongoose.model("User", userSchema);
