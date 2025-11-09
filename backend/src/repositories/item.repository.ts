import AppDataSource from "../db";
import Item from "../entities/Item";
import { NotFound } from "../services/errorMessages";
import { ItemValidated } from "../services/validation";
import CartRepository from "./cart.repository";
import ProductRepository from "./product.repository";

const ItemRepository = AppDataSource.getRepository(Item).extend({
    async readItem(cartId: number, productId: number): Promise<Item> {
        // Esta validación quizá la debería mover al service
        const item = await this
        .createQueryBuilder("item")
        .leftJoinAndSelect("item.cart", "cart")
        .leftJoinAndSelect("item.product", "product")
        .where("cart.cart_id = :cartId", { cartId })
        .andWhere("product.product_id = :productId", { productId })
        .getOne();

        await this
        .createQueryBuilder()
        .relation(Item, "cart")
        .of(item)
        .loadOne()

        if (!item) throw new NotFound("item");

        return item;
    },

    async addItems(cartId: number, productId: number, itemData: ItemValidated): Promise<Item> {
        const item = await this
        .createQueryBuilder("item")
        .leftJoinAndSelect("item.cart", "cart")
        .leftJoinAndSelect("item.product", "product")
        .where("cart.cart_id = :cartId", { cartId })
        .andWhere("product.product_id = :productId", { productId })
        .getOne();


        if (item) {
            await this
            .createQueryBuilder("item")
            .update()
            .set({ quantity: item.quantity + itemData.quantity })
            .where("cart.cart_id = :cartId", { cartId })
            .andWhere("product.product_id = :productId", { productId })
            .execute();


            const updatedItem = await this.readItem(cartId, productId);

            return updatedItem;
        }

        const cart = await CartRepository.readCart(cartId);
        const product = await ProductRepository.readProduct(productId);

        await this
        .createQueryBuilder("item")
        .insert()
        .values({
            quantity: itemData.quantity
        })
        .execute()

        const createdItem = await this
        .createQueryBuilder("item")
        .orderBy("item.item_id", "DESC")
        .getOne();
        
        console.log("CREATED ITEMMMMM: ", createdItem);

        await this
        .createQueryBuilder("item")
        .relation(Item, "cart")
        .of(createdItem)
        .set(cart);

        await this
        .createQueryBuilder("item")
        .relation(Item, "product")
        .of(createdItem)
        .set(product);

        return await this.readItem(cartId, productId);
    },

    async removeItems(cartId: number, productId: number, itemData: ItemValidated) {
    }
})

export default ItemRepository;
