import Product from "../entities/Product"; 
import ProductRepository from "../repositories/product.repository";
import { InvalidData } from "./errorMessages";
import { validateProductData } from "./validation";

export async function createProductService(productData: Partial<Product>): Promise<Product> {
    if (!validateProductData(productData)) throw new InvalidData();

    return await ProductRepository.createProduct(productData);
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
