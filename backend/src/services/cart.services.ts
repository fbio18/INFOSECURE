import Cart from "../entities/Cart";
import CartRepository from "../repositories/cart.repository";

export async function createCartService() {
    return await CartRepository.createCart();
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
