// errorHandler.js
const { isCelebrateError } = require('celebrate');

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  // 1. Log for developer debugging
  // eslint-disable-next-line no-console
  console.error(err);

  // Destructure properties directly with a default value to satisfy prefer-destructuring
  const { statusCode = 500, message } = err;
  let finalStatusCode = statusCode;
  let finalMessage = message;

  // 2. Intercept Celebrate/Joi validation errors safely
  if (isCelebrateError(err)) {
    finalStatusCode = 400;
    
    // Check all possible segments sequentially to locate the Joi error object
    const errorDetails = err.details.get('body') 
      || err.details.get('params') 
      || err.details.get('query')
      || err.details.get('headers')
      || err.details.get('cookies');

    // FIXED: Safely check if errorDetails exists before trying to access .details map
    if (errorDetails && errorDetails.details) {
      finalMessage = errorDetails.details.map((detail) => detail.message).join(', ');
    } else {
      finalMessage = 'Validation Error';
    }
  }

  // 3. Send response
  res.status(finalStatusCode).send({
    message: finalStatusCode === 500 ? 'An error occurred on the server' : finalMessage,
  });
};

module.exports = errorHandler;
