import { ProductModel } from '../model/product'
describe('test product model:', () => {
    const productModel = new ProductModel();
    it('test create product', async () => {
        const product = {
            "name": "Charger",
            "price": 1000
        }
        const result = await productModel.create(product);
        expect(result.id).toBeGreaterThanOrEqual(1);
        expect(result.name).toEqual('Charger');
        expect(result.price).toEqual(1000);
    })

    it('test show product', async () => {
        const result = await productModel.show(1);
        
        expect(result.name).toEqual('Charger');
    })

    it('test product index', async () => {
        const products = await productModel.index();

        products.forEach((value) => {
            expect(value.name.length).toBeGreaterThan(1);
        })
    })
})