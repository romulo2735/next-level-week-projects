import {Router} from "express";
import OrphanagesController from "./controllers/OrphanagesController";

const routes = Router();

routes.post('/orphanages', OrphanagesController.index);
routes.post('/orphanages/:id', OrphanagesController.show);
routes.post('/orphanages', OrphanagesController.create);

export default routes;