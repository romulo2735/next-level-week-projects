import {Request, Response} from "express";
import {getRepository} from "typeorm";
import Orphanages from "../models/Orphanages";
import orphanageViews from "../views/orphanage_view";
import * as Yup from "yup";

export default {

    /**
     * Listando todos os orfanatos
     * @param req
     * @param res
     */
    async index(req: Request, res: Response) {
        const orphanagesRspository = getRepository(Orphanages);
        const orphanages = await orphanagesRspository.find({
            // retornando com relacionamento
            relations: ['images']
        });

        return res.status(200).json(orphanageViews.index(orphanages));
    },

    /**
     * Procurando por um orfanato
     * @param req
     * @param res
     */
    async show(req: Request, res: Response) {
        // recebe o paramtro enviado.
        const {id} = req.params;

        const orphanagesRspository = getRepository(Orphanages);
        // pesquisa o orfanato pelo id passado.
        const orphanage = await orphanagesRspository.findOneOrFail(id, {
            // retornando com relacionamento
            relations: ['images']
        });

        return res.status(200).json(orphanageViews.show(orphanage));
    },

    /**
     *  Criação de um novo orfanato
     * @param req
     * @param res
     */
    async create(req: Request, res: Response) {
        const {name, latitude, longitude, about, instructions, opening_hours, open_on_weekends} = req.body;
        const orphanagesRspository = getRepository(Orphanages);

        // inserindo o tipo de dado que as imagens iram vir, como array[]
        const reqImages = req.files as Express.Multer.File[];
        // percorredo todas as image(ns) enviadas.
        const images = reqImages.map(image => {
            return {path: image.filename}
        });

        // validação de dados.
        const data = {name, latitude, longitude, about, instructions, opening_hours, open_on_weekends, images};
        const validations = Yup.object().shape({
            name: Yup.string().required(),
            latitude: Yup.number().required(),
            longitude: Yup.number().required(),
            about: Yup.string().required().max(300),
            instructions: Yup.string().required(),
            opening_hours: Yup.string().required(),
            open_on_weekends: Yup.boolean().required(),
            images: Yup.array(
                Yup.object().shape({
                    path: Yup.string().required()
                })),
        });

        await validations.validate(data, {abortEarly: false})

        // cria a base da entidade.
        const orphanage = orphanagesRspository.create(data);
        // cadastrar os dados.
        await orphanagesRspository.save(orphanage);

        return res.status(201).json(orphanage);
    }
};