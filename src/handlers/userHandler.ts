import { Application, Request, Response } from "express";
import { User, UserModel } from "../model/ user";


const userModel = new UserModel();

const createUser = async (req: Request, res: Response) => {
    const name = req.body.name;
    const password = req.body.password;
    const user: User = await userModel.create(name, password);
    res.json(user);
}

const authUser = async (req: Request, res: Response) => {
    const user = await userModel.auth(req.body.name, req.body.password);
    res.json(user);
}

export const userRoutes = (app: Application) => {
    app.post('/users', createUser);
    app.post('/users/auth', authUser);
}