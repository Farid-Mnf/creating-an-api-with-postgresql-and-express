import { Application, NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { User, UserModel } from "../model/user";


const userModel = new UserModel();

export const tokenMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const jwt = req.headers.authorization?.split(' ')[1];
    if (jwt != undefined && jwt.length > 0) {
        try {
            const result = verify(jwt, process.env.JWT_SECRET as string)
            next();
        } catch (err) {
            res.json("invalid jwt");
        }

    }else{
        res.json("invalid JWT")
    }

}

const createUser = async (req: Request, res: Response) => {
    const first_name = req.body.first_name;
    const last_name = req.body.last_name
    const password = req.body.password;
    const jwt = await userModel.create(first_name, last_name, password);
    res.json(jwt);
}

const showUser = async (req: Request, res: Response) => {
    const id: string = req.params.id as string;
    const user: User = await userModel.show(id);
    res.json(user);
}


const index = async (req: Request, res: Response) => {
    const users = await userModel.index();
    res.json(users);
}

export const userRoutes = (app: Application) => {
    app.post('/users', createUser);
    app.get('/users/:id', tokenMiddleware, showUser);
    app.get('/users', tokenMiddleware, index)
}