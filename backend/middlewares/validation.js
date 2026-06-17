const { celebrate, Joi, Segments } = require("celebrate");
const validator = require("validator");

// Custom URL validator logic
const validateURL = (value, helpers) => {
  if (!value) {
    return value;
  }
  return validator.isURL(value, { require_protocol: true })
    ? value
    : helpers.message("Must be a valid URL"); // Fixed: Uses helpers.message for intuitive custom errors
};

// 1. POST /signup — User Registration Schema
const validateUserBody = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().min(2).max(30).default("Jaques Cousteau").messages({
      "string.min": "Name must be at least 2 characters long",
      "string.max": "Name cannot exceed 30 characters",
    }),
    avatar: Joi.string().empty("").custom(validateURL).default("https://amazonaws.com"),
    email: Joi.string().required().email().messages({
      "string.email": "Must be a valid email address",
      "any.required": "Email is required",
    }),
    password: Joi.string().required().min(8).messages({
      "string.min": "Password must be at least 8 characters long",
      "any.required": "Password is required",
    }),
  }),
});

// 2. POST /signin — User Authentication Schema
const validateAuthentication = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().required().email().messages({
      "string.email": "Must be a valid email address",
      "any.required": "Email is required",
    }),
    password: Joi.string().required().messages({
      "any.required": "Password is required",
    }),
  }),
});

// 3. PATCH /users/me — Update Profile Schema
const validateUserUpdate = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).messages({
      "string.min": "Name must be at least 2 characters long",
      "string.max": "Name cannot exceed 30 characters",
      "any.required": "Name is required",
    }),
    avatar: Joi.string().required().custom(validateURL).messages({
      "any.required": "Avatar is required",
    }),
  }),
});

// 4. POST /items — Clothing Item Creation Schema
const validateClothingItem = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).messages({
      "string.min": "Name must be at least 2 characters long",
      "string.max": "Name cannot exceed 30 characters",
      "any.required": "Name is required",
    }),
    imageUrl: Joi.string().required().custom(validateURL).messages({
      "any.required": "Image URL is required",
    }),
    weather: Joi.string().required().valid("hot", "warm", "cold").messages({
      "any.only": "Weather must be one of [hot, warm, cold]",
      "any.required": "Weather type is required",
    }),
  }),
});

// 5. URL Parameter Schema — Validates MongoDB 24-character hex ObjectIds (:id)
const validateIdParam = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().hex().length(24).required().messages({
      "string.length": "Invalid ID format",
      "string.hex": "Invalid ID format",
      "any.required": "ID parameter is required",
    }),
  }),
});

module.exports = {
  validateUserBody,
  validateAuthentication,
  validateUserUpdate,
  validateClothingItem,
  validateIdParam, // Works globally for both user IDs and item IDs in your routes
};
