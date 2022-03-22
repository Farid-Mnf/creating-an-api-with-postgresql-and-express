import Client from "../database";
import { Order } from "../model/order";

export type Item = {
    id?: number,
    quantity: number,
    order_id: number,
    product_id: number
}

export class Cart {
    async addProducts(quantity: number, order_id: number, product_id: number): Promise<Item> {
        try {
            const conn = await Client.connect();
            const sql = "INSERT INTO orders_products(quantity, order_id, product_id) VALUES (($1), ($2), ($3)) RETURNING *";
            const item: Item = (await conn.query(sql, [quantity, order_id, product_id])).rows[0];
            conn.release();
            return item;
        } catch (err) {
            throw new Error("add products error: " + err);
        }
    }
    async completeOrder(order_id: number): Promise<Order> {
        try {
            const conn = await Client.connect();
            const sql = "UPDATE orders SET status='complete' WHERE id=($1) RETURNING *";
            const result = await conn.query(sql, [order_id]);
            conn.release();
            return result.rows[0];
        } catch (err) {
            throw new Error("complete order error: " + err);
        }
    }
    async getOrdersProducts(): 
    Promise<{"order_id": number, "product_id": number, "quantity": number, "user_id": number, "status": string}[]>
    {
        try {
            console.log(1);
            
            const conn = await Client.connect();
            const sql = "select order_id, product_id, quantity, user_id, status from orders o inner join orders_products op on o.id=op.order_id inner join products p on op.product_id=p.id";
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        } catch (err) {
            throw new Error("fetch orders products error: " + err);
        }
    }
}