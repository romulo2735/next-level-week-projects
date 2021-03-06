import Knex from "knex";

export async function up(knex: Knex) {
  return knex.schema.createTable("itens", (table) => {
    table.increments("id").primary();
    table.string("imagem").notNullable();
    table.string("titulo").notNullable();
  });
}

export async function down(knex: Knex) {
  knex.schema.dropSchema("itens");
}
