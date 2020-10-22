import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createOrphanages1602727053090 implements MigrationInterface {

    /**
     * Resposavel por Criar a tabela.
     * @param queryRunner
     */
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "orphanages",
            columns: [
                {name: 'id', type: 'integer', unsigned: true, isGenerated: true, generationStrategy: "increment"},
                {name: 'name', type: 'varchar'},
                {name: 'latitude', type: 'decimal', scale: 10, precision: 2},
                {name: 'lontitude', type: 'decimal', scale: 10, precision: 2},
                {name: 'about', type: 'text'},
                {name: 'instructions', type: 'text'},
                {name: 'opening_hours', type: 'varchar'},
                {name: 'open_on_weekends', type: 'boolean'}
            ]
        }));
    }

    /**
     * Responsável por dá um Drop na tabela.
     * @param queryRunner
     */
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('orphanages');
    }

}
