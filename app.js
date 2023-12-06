import express from "express";
import { PORT, HOST_DB } from "./env.js";
import morgan from "morgan";
import cors from "cors";

// Usamos express
const app = express();

// Hacemos que express interprete los JSON
app.use(express.json());

// Usamos morgan para recibir en consola las peticiones hechas
app.use(morgan("dev"));

// Usamos CORS para proteger las peticiones al servicio solamente con los http permitidos
const allowedHttp = ["http:/localhost:3030", "http:/localhost:3001"];
app.use(cors({ origin: allowedHttp }));

// Levantamos el servicio
app.listen(PORT, () => {
  console.log(`Servidor escuchando en ${HOST_DB}:${PORT}`);
});
