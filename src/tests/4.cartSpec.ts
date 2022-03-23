import { Cart } from '../service/Cart'
const cart = new Cart();

describe('test cart service: ', () => {
    it('test add product to order(cart):', async () => {
        const result = await cart.addProducts(8, 1, 1);

        expect(result.quantity).toEqual(8);
    });

    it('test complete order:', async () => {
        const result = await cart.completeOrder(1);

        expect(result.status).toEqual('complete');
    });

    it('test orders products list:', async () => {
        const result = await cart.getOrdersProducts();

        result.forEach((order_product) => {
            expect(order_product.order_id).toBeGreaterThanOrEqual(1);
            expect(order_product.product_id).toBeGreaterThanOrEqual(1);
            expect(order_product.quantity).toBeGreaterThanOrEqual(1);
            expect(order_product.user_id).toBeGreaterThanOrEqual(1);
            expect(order_product.status.length).toBeGreaterThanOrEqual('active'.length);
            
        })
    });

})