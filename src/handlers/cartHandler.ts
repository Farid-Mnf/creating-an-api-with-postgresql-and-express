import { Application, Request, Response } from "express"
import { Cart, Item } from "../service/Cart"
import { tokenMiddleware } from "./userHandler";

const cart = new Cart();

const addProduct = async (req: Request, res: Response) => {
    try {
        const order_id = parseInt(req.params.order_id as string);
        const quantity = parseInt(req.body.quantity as string);
        const product_id = parseInt(req.body.product_id as string);
        const result: Item = await cart.addProducts(quantity, order_id, product_id);
        res.json(result);
    } catch (err) {
        throw new Error("add product error: " + err);
    }
}

const completeOrder = async (req: Request, res: Response) => {
    try {
        const order_id = parseInt(req.params.order_id as string);
        const result = await cart.completeOrder(order_id);
        res.json(result);
    } catch (err) {
        throw new Error("complete order error: " + err);
    }

}

const getOrdersProducts = async (req: Request, res: Response) => {
    try {
        const ordersProducts = await cart.getOrdersProducts();
        res.json(ordersProducts);
    } catch (err) {
        throw new Error("get orders products error: " + err);
    }

}

export const cartRoutes = (app: Application) => {
    app.post('/orders/:order_id/products', tokenMiddleware, addProduct);
    app.get('/orders/complete/:order_id', tokenMiddleware, completeOrder);
    app.get('/orders-products', tokenMiddleware, getOrdersProducts);
}