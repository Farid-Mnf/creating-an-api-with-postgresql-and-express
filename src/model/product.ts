import Client from "../database";

export type Product = {
    id?: number,
    name: string,
    price: number
}

export class ProductModel {
    async create(product: Product): Promise<Product> {
        try{
            const conn = await Client.connect();
            const sql = "INSERT INTO products(name, price) VALUES (($1), ($2)) RETURNING *";
            const result = await conn.query(sql, [product.name, product.price]);
            conn.release();
            return result.rows[0];
        }catch(err){
            throw new Error("product creation error: " + err);
        }
    }

    async show(product_id: number): Promise<Product> {
        try{
            const conn = await Client.connect();
            const sql = "SELECT * FROM products WHERE id=($1)";
            const result = await conn.query(sql, [product_id]);
            conn.release();
            return result.rows[0];
        }catch(err){
            throw new Error("product fetch error: " + err);
        }
    }

    async index(): Promise<Product[]> {
        try{
            const conn = await Client.connect();
            const sql = "SELECT * FROM products";
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }catch(err){
            throw new Error("products index error: " + err);
        }
    }
}
