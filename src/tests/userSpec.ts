import { UserModel } from "../model/user"

describe('user model testing', () => {
    it('test create', async () => {
        const jwt = await new UserModel().create('first_name', 'last_name', 'password');
        expect(jwt.jwt.length).toBeGreaterThan(50);
    })

    it('test index', async () => {
        const result = await new UserModel().index();
        expect(result.length).toBeGreaterThanOrEqual(1);
    })

    it('test show', async () => {
        const result = await new UserModel().show("1");
        
        expect(result.first_name).toEqual("first_name");
    })
    
})