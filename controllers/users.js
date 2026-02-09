const bcrypt = require("bcrypt");
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

// POST /users — create a new user
exports.createUser = async (req, res) => {
  try {
    const { email, password, ...rest } = req.body;

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      email,
      password: hashedPassword,
      ...rest,
    });

    return res.status(201).json(newUser);
  } catch (err) {
    // Duplicate email error
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

// POST /login — authenticate user
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Custom mongoose method
    const user = await User.findUserByCredentials(email, password);

        // Create JWT valid for 7 days
        const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
          expiresIn: "7d",
        });
    
        return res.status(200).json({ token });
      } catch (err) {
        if (err.message === "User not found") {
          return res.status(NOT_FOUND).json({ message: "User not found" });
        }
    
        if (err.message === "Incorrect password") {
          return res.status(UNAUTHORIZED).json({ message: "Incorrect password" });
        }
    
        return res
          .status(INTERNAL_SERVER_ERROR)
          .json({ message: "An error has occurred on the server." });
      }
    };
