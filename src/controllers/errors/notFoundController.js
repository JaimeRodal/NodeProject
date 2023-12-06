const notFoundController = (req, res) => {
  res.status(404).send({
    status: "error",
    message: "Not Found",
  });
};

export default notFoundController;
