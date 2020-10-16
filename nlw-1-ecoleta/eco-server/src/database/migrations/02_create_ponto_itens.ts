import Knex from "knex";

export async function up(knex: Knex) {
  return knex.schema.createTable("ponto_itens", (table) => {
    table.increments("íd").primary();
    table.integer("ponto_id").notNullable().references("id").inTable("pontos");
    table.integer("item_id").notNullable().references("id").inTable("itens");
  });
}

export async function down(knex: Knex) {
  knex.schema.dropSchema("ponto_itens");
}
