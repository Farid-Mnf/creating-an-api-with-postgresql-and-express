import { Application, Request, Response } from "express";
import { OrderModel } from "../model/order";
import { tokenMiddleware } from "./userHandler";

const orderModel = new OrderModel();

const getCurrentUserOrder = async (req: Request, res: Response) => {
    try {
        const user_id = req.params.user_id as string;
        const order = await orderModel.getOrder(parseInt(user_id));
        res.json(order);
    } catch (err) {
        throw new Error("get current user\'s order error: " + err);
    }

}

const createOrder = async (req: Request, res: Response) => {
    try {
        const user_id = req.params.user_id as string;
        const order = await orderModel.create(parseInt(user_id));
        res.json(order);
    } catch (err) {
        throw new Error("create order error: " + err);
    }

}

export const orderRoutes = (app: Application) => {
    app.get('/orders/:user_id', tokenMiddleware, getCurrentUserOrder);
    app.post('/orders/:user_id', tokenMiddleware, createOrder);
}
