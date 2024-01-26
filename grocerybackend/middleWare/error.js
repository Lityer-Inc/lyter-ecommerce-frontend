import errResponse from '../utils/errorResponse.js';


export const handleErrors = (err, req, res, next) => {
  let error = err;
  error.message = err.message;

  console.log(err, "testingoooooo");
  if (err instanceof ReferenceError) {
    const errorMessage = err.message;
    error = new errResponse(errorMessage, 404); // You can choose an appropriate status code
  }

  // Duplicate error
  if (err.code === 11000) {
    const message = "Already registered";
    error = new errResponse(message, 404);
  }

  // Handle other general errors
  const status = error?.statusCode || 500;
  const message = error.message || "Internal Server Error";
  //console.log(message, "first check");
  res.status(status).json({ status: false, message: message });
};


