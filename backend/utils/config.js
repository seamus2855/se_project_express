require('dotenv').config();

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = {
  // Uses the .env value in production, falls back to a development string otherwise
  JWT_SECRET: NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret-key-fallback',
};
