import Client from "../database";


export type Order = {
    id?: number,
    status: string,
    user_id: number
}

export class OrderModel {
    async getOrder(user_id: number): Promise<Order> {
        try {
            const conn = await Client.connect();
            const sql = "SELECT * FROM orders WHERE user_id=($1) AND status='active'";
            const result = await conn.query(sql, [user_id]);
            conn.release();
            return result.rows[0];
        } catch (err) {
            throw new Error("order fetch error: " + err);
        }
    }
    async create(user_id: number): Promise<Order>{
        try{
            const conn = await Client.connect();
            const sql = "INSERT INTO orders(status, user_id) values (($1), ($2)) RETURNING *";
            const result = await conn.query(sql, ['active', user_id]) // status (active or complete)
            conn.release();
            return result.rows[0];
        }catch(err){
            throw new Error("create order error: " + err);
        }
    }
}