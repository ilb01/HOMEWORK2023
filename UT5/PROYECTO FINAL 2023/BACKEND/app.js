import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";

import shirtsRoutes from "./routes/shirtsRoutes.js";
import usersRoutes from "./routes/usersRoutes.js";
import leaguesRoutes from "./routes/leaguesRoutes.js";

// Conexión BD
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://127.0.0.1:27017/FUTBOLPREMIUNDB');

const app = express();
app.use(express.json());

// Habilitar bodyparser (de esta manera podemos leer "form-data" como "x-www-form-ulrencoded")
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Habilitar cors
app.use(cors());

// Rutas
app.use("/api", shirtsRoutes);
app.use("/api", usersRoutes);
app.use("/api", leaguesRoutes);

// Evita crash
process.on('uncaughtException', (error)  => {
  console.log('Something terrible happend: ',  error);
  process.exit(1); // salir de la aplicación
});

process.on('unhandledRejection', (error, promise) => {
  console.log(' We forgot to handle a promise rejection here: ', promise);
  console.log(' The error was: ', error );
});

// Puerto
app.listen(8800, () => {
  console.log("Connected!");
});