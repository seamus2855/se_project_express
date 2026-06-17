const errorHandler = (err, req, res, next) => {
  // 1. Log the error to the console for debugging
  console.error(err);

  // 2. Destructure statusCode and message from the error object
  // If statusCode is undefined, default to 500
  const { statusCode = 500, message } = err;

  // 3. Send the response
  res.status(statusCode).send({
    // If it's a 500 error, don't leak sensitive server details to the user
    message: statusCode === 500 
      ? "An error occurred on the server" 
      : message,
  });
};

module.exports = errorHandler;
