import { Application, Request, Response } from "express";
import { Product, ProductModel } from "../model/product";
import { tokenMiddleware } from "./userHandler";

const productModel = new ProductModel();

const index = async (req: Request, res: Response) => {
    const products = await productModel.index();
    res.json(products);
}

const show = async (req: Request, res: Response) => {
    const product = await productModel.show((req.params.id as unknown) as number);
    res.json(product);
}

const create = async (req: Request, res: Response) => {
    const reqProduct: Product = req.body;
    const product = await productModel.create(reqProduct);
    res.json(product);
}

export const productRoutes = (app: Application) => {
    app.get('/products', index);
    app.get('/products/:id', show);
    app.post('/products', tokenMiddleware, create);
}
