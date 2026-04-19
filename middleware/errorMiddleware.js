const errorMiddleware = (err, req, res, next) => {
  try{
  let error = { ...err };
  error.message = err.message;

  // Log the error for debugging
  console.error(err);

  // Handle specific Mongoose errors
  if (err.name === "ValidationError") {
    error.statusCode = 400;
    error.message = Object.values(err.errors).map((val) => val.message).join(", ");
  }

  if (err.name === "CastError") {
    error.statusCode = 400;
    error.message = `Resource not found with id of ${err.value}`;
  }
  if(err.code === 11000){
    error.statusCode = 400;
    error.message = "Duplicate field value entered";
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || "Server Error",
  });
}catch(e){
  next(e);
}
}

export default errorMiddleware;
