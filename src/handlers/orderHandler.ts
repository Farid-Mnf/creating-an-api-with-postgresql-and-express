import { Application, Request, Response } from "express";
import { OrderModel } from "../model/order";
import { tokenMiddleware } from "./userHandler";

const orderModel = new OrderModel();

const getCurrentUserOrder = async (req: Request, res: Response) => {
    const user_id = req.params.user_id as string;
    const order = await orderModel.getOrder(parseInt(user_id));
    res.json(order);
}

const createOrder = async (req: Request, res: Response) => {
    const user_id = req.params.user_id as string;
    const order = await orderModel.create(parseInt(user_id));
    res.json(order);
}

export const orderRoutes = (app: Application) => {
    app.get('/orders/:user_id', tokenMiddleware, getCurrentUserOrder);
    app.post('/orders/:user_id', tokenMiddleware, createOrder);
}
