-const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const {
  BAD_REQUEST,
  NOT_FOUND,
  INTERNAL_SERVER_ERROR,
  UNAUTHORIZED,
  CONFLICT,
} = require("../utils/errors");
const { JWT_SECRET } = require("../utils/config");

// POST /signup — create a new user
exports.createUser = async (req, res) => {
  try {
    const { email, password, ...rest } = req.body;

    if (!email || !password) {
      return res
        .status(BAD_REQUEST)
        .json({ message: "Email and password are required" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      email,
      password: hashedPassword,
      ...rest,
    });

    const userObj = newUser.toObject();
    delete userObj.password;

    return res.status(201).json(userObj);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(CONFLICT).json({ message: "Email already exists" });
    }

    if (err.name === "ValidationError" || err.name === "CastError") {
      return res.status(BAD_REQUEST).json({ message: "Invalid data" });
    }

    return res
      .status(INTERNAL_SERVER_ERROR)
      .json({ message: "An error has occurred on the server." });
  }
};

// POST /signin — authenticate user
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
      return res
        .status(BAD_REQUEST)
        .json({ message: "Email and password are required" });
    }

    const user = await User.findUserByCredentials(email, password);

    const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
      expiresIn: "7d",
    });

    return res.status(200).json({ token });
  } catch (err) {
    if (err.message === "Incorrect email or password") {
      return res
        .status(UNAUTHORIZED)
        .json({ message: "Incorrect email or password" });
    }

    return res
      .status(INTERNAL_SERVER_ERROR)
      .json({ message: "An error has occurred on the server." });
  }
};

// GET /users/me — get current user
exports.getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(NOT_FOUND).json({ message: "User not found" });
    }

    return res.json(user);
  } catch (err) {
    return res
      .status(INTERNAL_SERVER_ERROR)
      .json({ message: "An error has occurred on the server." });
  }
};

// PATCH /users/me — update profile
exports.updateCurrentUser = async (req, res) => {
  try {
    const { name, avatar } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { name, avatar },
      { new: true, runValidators: true },
    );

    if (!updatedUser) {
      return res.status(NOT_FOUND).json({ message: "User not found" });
    }

    return res.json(updatedUser);
  } catch (err) {
    if (err.name === "ValidationError" || err.name === "CastError") {
      return res.status(BAD_REQUEST).json({ message: "Invalid data" });
    }

    return res
      .status(INTERNAL_SERVER_ERROR)
      .json({ message: "An error has occurred on the server." });
  }
};
