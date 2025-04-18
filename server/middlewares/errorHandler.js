function errorHandler(err, req, res, next) {
  console.log(err);

  try {
    let error = { ...err };

    //  mongooose bas ObjectId
    if (err.name === "CastError") {
      error = new Error("Resource not found");
      error.statusCode = 404;
    }
    //mongodb duplicate key
    if (err.code === 11000) {
      const message = "Duplicate filed value entered.";
      error = new Error(message);
      error.statusCode === 400;
    }
    // mongoose validation error
    if (err.name === "ValidationError") {
      const message = Object.values(err.errors).map((val) => val.message);
      error = new Error(message.join(", "));
      error.statusCode = 400;
    }
    res.json({
      success: false,
      statusCode: error.statusCode || 500,
      error: error.message || "Internal Server Error",
    });
  } catch (ex) {
    console.log(ex.message);
  }
}

export default errorHandler;
