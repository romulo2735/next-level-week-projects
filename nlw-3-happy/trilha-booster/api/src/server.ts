import express from "express";
import path from "path";
import cors from "cors";
import "express-async-errors"

import './database/connection';

import routes from "./routes";
import errorHandler from "./errors/handler";

const app = express();

app.use(cors);
app.use(express.json);
app.use(routes);

// exportando as urls de acesso para as imagens.
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')))
// disparando exeções mais condensadas.
app.use(errorHandler);

app.listen(3333);