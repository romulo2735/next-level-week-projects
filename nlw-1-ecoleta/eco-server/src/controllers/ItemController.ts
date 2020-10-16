import { Request, Response } from "express";
import knex from "../database/connection";

class ItemController {
  async index(req: Request, res: Response) {
    const itens = await knex("itens").select("*");
    const serializedItens = itens.map((item) => {
      return {
        id: item.id,
        titulo: item.titulo,
        imagem: `http://192.168.10.12:3333/uploads/${item.imagem}`,
      };
    });
    return res.json(serializedItens);
  }
}

export default ItemController;
