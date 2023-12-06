import jwt from "jsonwebtoken";
import { getError } from "../helpers.js";

const Auth = (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      getError("El header 'authorization' es requerido", 401);
    }

    const [tokenType, token] = authorization.split(" ");

    if (tokenType !== "Bearer") {
        getError("El token debe ser de tipo 'Bearer'", 400);
    }

    let tokenPayload;

    try {
      tokenPayload = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        getError("El token es inválido", 400);
    }

    req.auth = tokenPayload;

    next();
  } catch (error) {
    next(error);
  }
};

export default Auth;
