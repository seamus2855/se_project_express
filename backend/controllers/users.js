const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { JWT_SECRET } = require('../utils/config');
// Import your custom Error classes explicitly to avoid mixed variable definitions
const { BadRequestError, UnauthorizedError, NotFoundError, ConflictError } = require('../errors');

// ==========================================
// 1. POST /signup — Create New User Profile
// ==========================================
exports.createUser = async (req, res, next) => {
  try {
    const { email, password, ...rest } = req.body;
    if (!email || !password) {
      throw new BadRequestError("Email and password are required");
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
      return next(new ConflictError('Email already exists'));
    }
    if (err.name === 'ValidationError' || err.name === 'CastError') {
      return next(new BadRequestError('Invalid user data provided'));
    }
    return next(err); // Hands unhandled errors over to winston and central error handler
  }
};

// ==========================================
// 2. POST /signin — Authenticate & Generate Token
// ==========================================
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new BadRequestError('Email and password are required');
    }
    const user = await User.findUserByCredentials(email, password);
    const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });
    return res.status(200).json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        avatar: user.avatar,
        email: user.email,
      },
    });
  } catch (err) {
    if (err.message === 'Incorrect email or password' || err.name === 'AuthenticationError') {
      return next(new UnauthorizedError('Incorrect email or password'));
    }
    return next(err);
  }
};

// ==========================================
// 3. GET /users/me — Fetch Current Profile Data
// ==========================================
exports.getCurrentUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    if (!user) {
      throw new NotFoundError('User not found');
    }
    return res.status(200).json(user);
  } catch (err) {
    if (err.name === 'CastError') {
      return next(new BadRequestError('Invalid ID format'));
    }
    return next(err);
  }
};

// ==========================================
// 4. PATCH /users/me — Update Custom Profile Metadata
// ==========================================
exports.updateCurrentUser = async (req, res, next) => {
  try {
    const { name, avatar } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { name, avatar },
      { new: true, runValidators: true },
    ).select('-password');
    if (!updatedUser) {
      throw new NotFoundError('User not found');
    }
    return res.status(200).json(updatedUser);
  } catch (err) {
    if (err.name === 'ValidationError' || err.name === 'CastError') {
      return next(new BadRequestError('Invalid profile data provided'));
    }
    return next(err);
  }
};
