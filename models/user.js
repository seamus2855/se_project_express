const mongoose = require("mongoose");
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
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false, // IMPORTANT: do not return password by default
    },
  },
  { versionKey: false }
);

// STATIC METHOD — find user by credentials
userSchema.statics.findUserByCredentials = async function (email, password) {
  // 1. Find user by email and explicitly include password
  const user = await this.findOne({ email }).select("+password");

  if (!user) {
    throw new Error("Incorrect email or password");
  }

  // 2. Compare password with hash
  const matched = await bcrypt.compare(password, user.password);

  if (!matched) {
    throw new Error("Incorrect email or password");
  }

  // 3. Return user if valid
  return user;
};

module.exports = mongoose.model("User", userSchema);
