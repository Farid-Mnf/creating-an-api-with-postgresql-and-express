import { decode } from "jsonwebtoken";
import { OrderModel } from "../model/order";
import { UserModel } from "../model/user"

describe('test order model:', () => {
    let orderModel: OrderModel;
    let user_id: number;
    beforeAll(async () => {
        const userModel = new UserModel();
        orderModel = new OrderModel();
        let user = await userModel.create('test', 'test', 'pass');
        const jwt = decode(user.jwt);

    })

    it('test create order to return new order', async () => {
        const result = await orderModel.create(1);
        
        expect(result.status).toEqual('active');        
    })

    it('test show user active order', async () => {
        const result = await orderModel.getOrder(1);

        expect(result.status).toEqual('active');
    })


})