import {Request, Response} from "express";
import {getRepository} from "typeorm";
import Orphanages from "../models/Orphanages";

export default {

    /**
     * Listando todos os orfanatos
     * @param req
     * @param res
     */
    async index(req: Request, res: Response) {
        const orphanagesRspository = getRepository(Orphanages);
        const orphanages = await orphanagesRspository.find();

        return res.status(200).json(orphanages);
    },

    /**
     * Procurando por um orfanato
     * @param req
     * @param res
     */
    async show(req: Request, res: Response) {
        const {id} = req.params;

        const orphanagesRspository = getRepository(Orphanages);
        const orphanage = await orphanagesRspository.findOneOrFail(id);

        return res.status(200).json(orphanage);
    },

    /**
     *  Criação de um novo orfanato
     * @param req
     * @param res
     */
    async create(req: Request, res: Response) {
        const {name, latitude, longitude, about, instructions, opening_hours, open_on_weekends} = req.body;
        const orphanagesRspository = getRepository(Orphanages);

        // cria a base da entidade.
        const orphanage = orphanagesRspository.create({
            name, latitude, longitude, about, instructions, opening_hours, open_on_weekends
        });
        // cadastrar os dados.
        await orphanagesRspository.save(orphanage);

        return res.status(201).json(orphanage);
    }
};