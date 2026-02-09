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

// POST /signup — create a new user
exports.createUser = async (req, res) => {
  try {
    const { email, password, ...rest } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
          email,
          password: hashedPassword,
          ...rest,
        });
    
        return res.status(201).json(newUser);
      } catch (error) {
        return res.status(INTERNAL_SERVER_ERROR).json({ message: error.message });
      }
    };
