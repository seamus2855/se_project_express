const User = require("../models/user");
const {
  BAD_REQUEST,
  NOT_FOUND,
  INTERNAL_SERVER_ERROR
} = require("../utils/errors");

// GET /users — fetch all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(INTERNAL_SERVER_ERROR).json({ message: "Server error" });
  }
};

// GET /users/:id — fetch a single user
exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(NOT_FOUND).json({ message: "User not found" });
    }

    res.json(user);
  } catch (err) {
    res.status(BAD_REQUEST).json({ message: "Invalid ID format" });
  }
};

// POST /users — create a new user
exports.createUser = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json(newUser);
  } catch (err) {
    res.status(BAD_REQUEST).json({ message: "Invalid data" });
  }
};

// PATCH /users/:id — update a user
exports.updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(NOT_FOUND).json({ message: "User not found" });
    }

    res.json(updatedUser);
  } catch (err) {
    res.status(BAD_REQUEST).json({ message: "Invalid data or ID format" });
  }
};
