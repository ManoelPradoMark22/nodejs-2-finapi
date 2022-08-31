module.exports = (name, httpStatusCode, message, data) => (
  data ? {
    name: name,
    httpStatusCode: httpStatusCode,
    message: message,
    data: data
  } : {
    name: name,
    httpStatusCode: httpStatusCode,
    message: message
  }
);