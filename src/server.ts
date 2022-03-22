import express, { Request, Response } from 'express'
import { cartRoutes } from './handlers/cartHandler';
import { orderRoutes } from './handlers/orderHandler';
import { productRoutes } from './handlers/productHandler';
import { userRoutes } from './handlers/userHandler'

const app: express.Application = express()
const address: string = "0.0.0.0:3000"

app.use(express.json());
userRoutes(app);
productRoutes(app);
orderRoutes(app);
cartRoutes(app);

app.get('/', function (req: Request, res: Response) {
    res.send('Hello World!')
})

app.listen(3000, function () {
    console.log(`starting app on: ${address}`)
})
