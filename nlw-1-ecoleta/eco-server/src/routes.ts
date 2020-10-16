import express from "express";


import PontoController from "./controllers/PontoController";
import ItemController from "./controllers/ItemController";

const routes = express.Router();

const pontoController = new PontoController();
const itemController = new ItemController();

routes.get("/itens", itemController.index);

routes.get("/pontos", pontoController.index);
routes.get("/pontos/:id", pontoController.show);
routes.post("/pontos", pontoController.store);

export default routes;