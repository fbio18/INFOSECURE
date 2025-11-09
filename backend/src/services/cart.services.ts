import Cart from "../entities/Cart";
import Item from "../entities/Item";
import CartRepository from "../repositories/cart.repository";
import { InvalidData, InvalidId } from "./errorMessages";
import { validateUpdateCartData } from "./update-validation";
import { ItemValidated, validateCartData, validateItemData, validateNumberId } from "./validation";

export async function createCartService(cartData: Partial<Cart>): Promise<Cart> {
    const validatedData = validateCartData(cartData);

    return await CartRepository.createCart(validatedData);
}

export async function readCartService(cartId: number): Promise<Cart> {
    if (!validateNumberId(cartId)) throw new InvalidId("number");

    return await CartRepository.readCart(cartId);
}

export async function readAllCartsService(): Promise<Cart[]> {
    return await CartRepository.readAllCarts();
    
}

export async function updateCartService(cartId: number, cartUpdatedData: Partial<Cart>) {
    if (!validateNumberId(cartId)) throw new InvalidId("number");
    if (!validateUpdateCartData(cartUpdatedData)) throw new InvalidData();

    return await CartRepository.updateCart(cartId, cartUpdatedData);
}

export async function addItemService(cartId: number, productId: number, itemData: Partial<Item>): Promise<Cart> {
    if (!validateNumberId(cartId) || !validateNumberId(productId)) throw new InvalidId("number");
    
    const validatedData: ItemValidated = validateItemData(itemData);

    return await CartRepository.addItem(cartId, productId, validatedData);

}

export async function deleteCartService(cartId: number) {
    return await CartRepository.deleteCart(cartId);
}
