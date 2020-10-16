const request = require('supertest');
const app = require('../../src/app.js');
const connection = require('../../src/database/connection');

describe('ONG', () => {
    beforeEach(async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();
    });

    afterAll(async () => {
        await connection.destroy();
    });

    it('should be able to create a new ONG', async () => {
        const response = await request(app)
            .post('/ongs')
            .send({
                name: "Lorem IPSUM",
                email: "contato@ong.com.br",
                whatsapp: "55987517074",
                city: "Fortaleza",
                uf: "CE"
            });

        expect(response.body).toHaveProperty('ong');
        expect(response.body.ong).toHaveLength(8);
    });
});
