const handleSuccess = (res, message = 'API Successful', status = 200, data = null) => {
  const response = {
    status,
    message,
    data,
    success: true,
  };
  return res.status(status).json(response);
};

const handleError = (res, message = 'Bad request', status = 400, data = null) => {
  const response = {
    status,
    message,
    data,
    success: false,
  };
  return res.status(status).json(response);
};

const handleServerError = (res, message = 'Internal server error', status = 500, data = null) => {
  const response = {
    status,
    message,
    data,
    success: false,
  };
  return res.status(status).json(response);
};

module.exports = {
  handleError,
  handleSuccess,
  handleServerError,
};
