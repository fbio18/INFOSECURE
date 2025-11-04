import Product from "../entities/Product"; 
import ProductRepository from "../repositories/product.repository";

export async function createProductService() {
    return await ProductRepository.createProduct();
}

export async function readProductService(productId: number): Promise<Product> {
    return await ProductRepository.readProduct(productId);
}

export async function readAllProductsService(): Promise<Product[]> {
    return await ProductRepository.readAllProducts();
}

export async function updateProductService() {
    await ProductRepository.updateProduct();
}

export async function deleteProductService(productId: number) {
    return await ProductRepository.deleteProduct(productId);
}
