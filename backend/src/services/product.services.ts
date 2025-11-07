import Product from "../entities/Product"; 
import ProductRepository from "../repositories/product.repository";
import { InvalidId } from "./errorMessages";
import { validateNumberId, validateProductData } from "./validation";

export async function createProductService(productData: Partial<Product>): Promise<Product> {
    const validatedData = validateProductData(productData);

    return await ProductRepository.createProduct(validatedData);
}

export async function readProductService(productId: number): Promise<Product> {
    if (!validateNumberId(productId)) throw new InvalidId("number");

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
