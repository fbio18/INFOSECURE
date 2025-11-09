import AppDataSource from "../db";
import Cart from "../entities/Cart";
import { assignCartRelationService, readClientService } from "../services/client.services";
import { NotFound } from "../services/errorMessages";
import { CartValidated, ItemValidated } from "../services/validation";
import ClientRepository from "./client.repository";
import ItemRepository from "./item.repository";

// No creo que sea la solución más eficiente, pero es lo que hay de momento
const CartRepository = AppDataSource.getRepository(Cart).extend({
    async createCart(cartData: CartValidated): Promise<Cart> {
        const client = await readClientService(cartData.client);
        await this
        .createQueryBuilder("cart")
        .insert()
        .values({})
        .execute();


        const returnedCart = await this
        .createQueryBuilder("cart")
        .leftJoinAndSelect("cart.client", "client")
        .leftJoinAndSelect("cart.items", "items")
        .orderBy("cart.cart_id", "DESC")
        .getOne();

        await this
        .createQueryBuilder("cart")
        .relation(Cart, "client")
        .of(returnedCart)
        .set(client);

        if (!returnedCart) throw new NotFound("cart");

        await assignCartRelationService(cartData.client, returnedCart.cart_id);
        await this.assignClientRelation(returnedCart.cart_id, cartData.client);

        return await this.readCart(returnedCart.cart_id);
    },

    async readCart(cartId: number): Promise<Cart> {
        const cart = await this
        .createQueryBuilder("cart")
        .leftJoinAndSelect("cart.client", "client")
        .leftJoinAndSelect("cart.items", "items")
        .where("cart.cart_id = :cartId", { cartId })
        .getOne();

        if (!cart) throw new NotFound("cart");

        return cart;
    },

    async readAllCarts(): Promise<Cart[]> {
        const carts = await this
        .createQueryBuilder("cart")
        .leftJoinAndSelect("cart.client", "client")
        .leftJoinAndSelect("cart.items", "items")
        .getMany();

        if (!carts) throw new NotFound("cart");

        return carts;
    },

    async updateCart(cartId: number, cartUpdatedData: Partial<Cart>): Promise<Cart> {
        await this
        .createQueryBuilder()
        .update()
        .set(cartUpdatedData)
        .where("cart_id = :cartId", { cartId })
        .execute();

        const updatedCart = await this.readCart(cartId);

        return updatedCart;
    },

    async deleteCart(cartId: number) {
        await this
        .createQueryBuilder("cart")
        .delete()
        .where("cart.cart_id = :cartId", { cartId })
        .execute();
    },

    async assignClientRelation(cartId: number, clientId: number) {
        const cart = this.readCart(cartId);
        const client = ClientRepository.readClient(clientId);

        await this
        .createQueryBuilder("cart")
        .relation(Cart, "client")
        .of(cart)
        .set(client);
    },

    async addItem(cartId: number, productId: number, itemData: ItemValidated): Promise<Cart> {
        await ItemRepository.addItems(cartId, productId, itemData);

        // Retorna el resultado así para ahorrarme guardarme el carrito en memoria
        return await this.readCart(cartId);
    }
})

export default CartRepository;
