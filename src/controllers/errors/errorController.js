// Middleware de errores
const errorController = (err, req, res, next) => {
  res.status(err.httpStatus).send({
    status: err.code,
    message: err.message,
  });
};
// Exportamos el middleware
export default errorController;
