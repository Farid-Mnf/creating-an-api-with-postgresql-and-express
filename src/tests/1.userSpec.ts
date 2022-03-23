import { decode, Jwt, JwtPayload, verify } from "jsonwebtoken";
import Client from "../database";
import { JWT, User, UserModel } from "../model/user"

describe('user model testing:', () => {
    it('test create', async () => {        
        const jwt = await new UserModel().create('first_name', 'last_name', 'password');
        
        expect(jwt.jwt.length).toBeGreaterThan(50);
    })

    it('test index', async () => {
        const result = await new UserModel().index();
        
        expect(result.length).toBeGreaterThanOrEqual(1);
    })

    it('test show', async () => {
        await new UserModel().create('test', 'show', 'pass');
        
        const conn = await Client.connect();
        const sql = "SELECT * FROM users WHERE first_name='test' AND last_name='show'";
        const result = await conn.query(sql);
        conn.release();
        const user: User = result.rows[0];

        expect(user.first_name + user.last_name).toEqual('testshow');
    })

})