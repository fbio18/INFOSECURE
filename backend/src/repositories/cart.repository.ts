import AppDataSource from "../db";
import Cart from "../entities/Cart";

const CartRepository = AppDataSource.getRepository(Cart).extend({
    async createCart(): Promise<Cart> {
        await this
        .createQueryBuilder("cart")
        .insert()
        .values({})
        .execute();

        const returnedCart = await this
        .createQueryBuilder("cart")
        .orderBy("cart.cart_id", "DESC")
        .getOne();

        if (!returnedCart) throw new Error();

        return returnedCart;
    },

    async readCart(cartId: number): Promise<Cart> {
        const cart = await this
        .createQueryBuilder("cart")
        .where("cart.id = :cartId", { cartId })
        .getOne();

        if (!cart) throw new Error();

        return cart;
    },

    async readAllCarts(): Promise<Cart[]> {
        const carts = await this
        .createQueryBuilder("cart")
        .getMany();

        if (!carts) throw new Error();

        return carts;
    },

    async updateCart() {
        const updatedCart = await this
        .createQueryBuilder()
        .update()
        .set({})
        .where({})
        .execute();

        if (!updatedCart) throw new Error();

        return updatedCart;
    },

    async deleteCart(cartId: number) {
        await this
        .createQueryBuilder("cart")
        .delete()
        .where("cart.cart_id = :cartId", { cartId })
        .execute();
    }
})

export default CartRepository;
