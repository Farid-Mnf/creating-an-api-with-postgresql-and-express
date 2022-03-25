import { Application, Request, Response } from "express";
import { Product, ProductModel } from "../model/product";
import { tokenMiddleware } from "./userHandler";

const productModel = new ProductModel();

const index = async (req: Request, res: Response) => {
    try {
        const products = await productModel.index();
        res.json(products);
    } catch (err) {
        throw new Error("index products error: " + err);
    }
}

const show = async (req: Request, res: Response) => {
    try {
        const product = await productModel.show((req.params.id as unknown) as number);
        res.json(product);
    } catch (err) {
        throw new Error("show product error: " + err);
    }
}

const create = async (req: Request, res: Response) => {
    try {
        const reqProduct: Product = req.body;
        const product = await productModel.create(reqProduct);
        res.json(product);
    } catch (err) {
        throw new Error("create product error: " + err);
    }
}

export const productRoutes = (app: Application) => {
    app.get('/products', index);
    app.get('/products/:id', show);
    app.post('/products', tokenMiddleware, create);
}