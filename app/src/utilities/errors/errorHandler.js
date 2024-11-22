function errorHandler(error, req, res, next) {
  const statusCode = error.statusCode || 500;
  console.error(JSON.stringify(error.message), error.stack);
  res.status(statusCode).json({ 
    error: "Something went wrong!",
    message: error.message.public || error.message,

  });
}
module.exports = errorHandler




