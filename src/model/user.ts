import { genSaltSync, hashSync } from "bcrypt";
import { sign } from "jsonwebtoken";
import Client from "../database"

export type User = {
    id?: number;
    first_name: string;
    last_name: string,
    password_digest?: string;
}

export type JWT = {
    jwt: string
}

export class UserModel {

    async index(): Promise<User[]> {
        try {
            const conn = await Client.connect();
            const sql = "SELECT * FROM users";
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        } catch (err) {
            throw new Error("user index error: " + err);
        }
    }

    async show(id: string): Promise<User> {
        try {
            const conn = await Client.connect();
            const sql = "SELECT * FROM users WHERE id=($1)";
            const result = await conn.query(sql, [id]);
            conn.release();
            const user: User = result.rows[0];
            return user;
        } catch (err) {
            throw new Error("user creation error: " + err);
        }
    }

    async create(first_name: string, last_name: string, password: string): Promise<JWT> {

        try {
            const salt = genSaltSync(parseInt(process.env.SALT_ROUNDS as string));
            const hash = hashSync(password, salt);
            const conn = await Client.connect();
            const sql = "INSERT INTO users(first_name, last_name, password_digest) VALUES (($1), ($2), ($3)) RETURNING *";
            const result = await conn.query(sql, [first_name, last_name, hash]);
            conn.release();
            const user: User = result.rows[0];
            const Jwt = {
                jwt: sign(user, process.env.JWT_SECRET as string)
            }
            return Jwt;
        } catch (err) {
            throw new Error("user creation error: " + err);
        }
    }

}