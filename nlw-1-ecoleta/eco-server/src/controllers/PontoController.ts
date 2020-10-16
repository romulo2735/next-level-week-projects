import { Request, Response, request } from "express";
import knex from "../database/connection";

class PontoController {
  async index(req: Request, res: Response) {
    const { cidade, uf, itens } = req.query;
    const parseItens = String(itens)
      .split(",")
      .map((item) => Number(item.trim()));

    const pontos = await knex("pontos")
      .join("ponto_itens", "ponto_id", "=", "ponto_itens.ponto_id")
      .whereIn("ponto_itens.item_id", parseItens)
      .where("cidade", String(cidade))
      .where("uf", String(uf))
      .distinct()
      .select("pontos.*");

      return res.json(pontos);
  }

  async show(req: Request, res: Response) {
    const { id } = req.params;
    const ponto = await knex("pontos").where("id", id).first();

    if (!ponto) {
      return res.status(404).json({ message: "Ponto não encontrado" });
    }

    const itens = await knex("itens")
      .join("ponto_itens", "itens.id", "=", "ponto_itens.item_id")
      .where("ponto_itens.ponto_id", id)
      .select("itens.titulo");

    return res.json({ ponto, itens });
  }

  async store(req: Request, res: Response) {
    const {
      nome,
      email,
      whatsapp,
      uf,
      cidade,
      latitude,
      longitude,
      itens,
    } = req.body;

    const trx = await knex.transaction();

    // dados do ponto a ser cadastrado
    const ponto = {
      nome,
      email,
      whatsapp,
      uf,
      cidade,
      latitude,
      longitude,
      imagem: "https://cdn.pixabay.com/photo/2014/01/31/06/42/glass-255281_960_720.jpg",
    };

    // cadastrando um novo ponto.
    const insertedIds = await trx("pontos").insert(ponto);

    // mapeando os itens
    const ponto_id = insertedIds[0];
    const pontoItens = itens.map((item_id: number) => {
      return { item_id, ponto_id };
    });

    // inserindo os itens no relacionamento
    await trx("ponto_itens").insert(pontoItens);
    await trx.commit();

    return res.json({
      id: ponto_id,
      ...ponto,
    });
  }
}

export default PontoController;
