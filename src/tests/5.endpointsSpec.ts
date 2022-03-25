import supertest from "supertest"
import { JWT, User, UserModel } from "../model/user";
import app from "../server"

const request = supertest(app);

describe('test endpoints:', () => {
    let jwt: JWT;
    beforeAll(async () => {
        const userModel = new UserModel();
        jwt = await userModel.create('test', 'showendpoint', 'pass');
    })

    it('test index products', async () => {
        const response = await request.get('/products');

        expect(response.status).toEqual(200);

        const productsLen = response.body.length;
        for (let i = 0; i < productsLen; i++) {
            expect(response.body[i].name.length).toBeGreaterThan(1);
        }

    });


    let product_id: number;
    it('test create product', async () => {
        const response = await request.post('/products')
            .set('Authorization', 'Bearer ' + jwt.jwt)
            .send({
                'name': 'Microphone',
                'price': 4832
            })
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json');
        product_id = response.body.id;
        expect(response.status).toEqual(200);
        expect(response.body.name).toEqual('Microphone');
        expect(response.body.price).toEqual(4832);
    })

    it('test show product using id', async () => {
        const response = await request.get('/products/' + product_id).set('Accept', 'application/json');

        const expectedValue = {
            'id': product_id,
            'name': 'Microphone',
            'price': 4832
        }

        expect(response.status).toEqual(200);
        expect(response.body).toEqual(expectedValue);

    })

    it('test index users', async () => {
        const response = await request.get('/users')
            .set('Authorization', 'Bearer ' + jwt.jwt)
            .set('Accept', 'application/json');

        expect(response.status).toEqual(200);

        const users = response.body;
        const usersLen = users.length;

        for (let i = 0; i < usersLen; i++) {
            expect(users[i].first_name.length).toBeGreaterThan(1);
        }
    })

    it('test show user using user_id', async () => {
        const response = await request.get('/users/1')
            .set('Authorization', 'Bearer ' + jwt.jwt)
            .set('Accept', 'application/json');

        expect(response.status).toEqual(200);

        expect(response.body.id).toEqual(1);
        expect(response.body.first_name.length).toBeGreaterThan(1);
        expect(response.body.last_name.length).toBeGreaterThan(1);
        expect(response.body.password_digest.length).toBeGreaterThan(10);

    })

    it('test create user and return token', async () => {
        const response = await request.post('/users')
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .send({
                'first_name': 'test',
                'last_name': 'user',
                'password': 'pass234'
            })

        expect(response.status).toEqual(200);
        const jwtObject = response.body.jwt;
        expect(jwtObject.length).toBeGreaterThanOrEqual(30);
    })

    it('test create order by user_id', async () => {
        const response = await request
            .post('/orders/1')
            .set('Authorization', 'Bearer ' + jwt.jwt)
            .set('Accept', 'application/json');

        expect(response.body.status).toEqual('active');
        expect(response.body.user_id).toEqual(1);
    })

    it('test get user\'s current order', async () => {
        const response = await request
            .get('/orders/1')
            .set('Authorization', 'Bearer ' + jwt.jwt)
            .set('Accept', 'application/json');

        expect(response.body.status).toEqual('active');

    })

    it('test fetch list of orders_products', async () => {
        const response = await request
            .get('/orders-products')
            .set('Authorization', 'Bearer ' + jwt.jwt)
            .set('Accept', 'application/json');

        expect(response.body[0].order_id).toBeGreaterThanOrEqual(1);
        expect(response.body[0].product_id).toBeGreaterThanOrEqual(1);
        expect(response.body[0].quantity).toBeGreaterThanOrEqual(1);
        expect(response.body[0].user_id).toBeGreaterThanOrEqual(1);
        expect(response.body[0].status.length).toBeGreaterThanOrEqual(5);
    })

    it('test add product to an order', async () => {
        const response = await request
            .post('/orders/1/products')
            .set('Authorization', 'Bearer ' + jwt.jwt)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .send({
                "quantity": 6,
                "product_id": 2
            });

        expect(response.body.id).toBeGreaterThanOrEqual(1);
        expect(response.body.quantity).toEqual(6);
        expect(response.body.order_id).toEqual(1);
        expect(response.body.product_id).toBeGreaterThanOrEqual(1);
    })
})