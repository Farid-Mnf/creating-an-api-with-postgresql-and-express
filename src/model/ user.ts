import { compareSync, genSaltSync, hashSync } from "bcrypt";
import Client from "../database"

export type User = {
    id?: number;
    name: string;
    password_digest?: string;
}

export class UserModel {
    async create(name: string, password: string): Promise<User> {
        try {
            const salt = genSaltSync(parseInt(process.env.SALT_ROUNDS as string));
            const hash = hashSync(password, salt);
            const conn = await Client.connect();
            const sql = "INSERT INTO users(name, password_digest) VALUES (($1) , ($2)) RETURNING *";
            const result = await conn.query(sql, [name, hash]);
            conn.release();
            const user: User = result.rows[0];
            return user;
        } catch (err) {
            throw new Error("user create error: " + err);
        }
    }

    async auth(name: string, password: string): Promise<User | null> {
        try {
            const conn = await Client.connect();
            const sql = "SELECT * FROM users WHERE name=($1)";
            const result = await conn.query(sql, [name]);
            conn.release();
            if(result.rows.length > 0) {
                const user: User = result.rows[0];
            
                const bool = compareSync(password, user.password_digest as string);
                
                if(bool){
                    console.log("equal");
                    return user;
                }
            }
            return null;

        } catch (err) {
            throw new Error("user auth error: " + err);
        }
    }
}