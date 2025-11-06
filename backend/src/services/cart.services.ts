import Cart from "../entities/Cart";
import CartRepository from "../repositories/cart.repository";
import { validateCartData } from "./validation";

export async function createCartService(cartData: Partial<Cart>): Promise<Cart> {
    const validatedData = validateCartData(cartData);

    return await CartRepository.createCart(validatedData);
}

export async function readCartService(cartId: number): Promise<Cart> {
    return await CartRepository.readCart(cartId);
}

export async function readAllCartsService(): Promise<Cart[]> {
    return await CartRepository.readAllCarts();
    
}

export async function updateCartService() {
    return await CartRepository.updateCart();
}

export async function deleteCartService(cartId: number) {
    return await CartRepository.deleteCart(cartId);
}
