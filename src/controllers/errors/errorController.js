const errorController = (err, req, res, next) => {
  res.status(err.httpStatus).send({
    status: err.code,
    message: err.message,
  });
};

export default errorController;
