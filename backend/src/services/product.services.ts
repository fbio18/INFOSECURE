import Product from "../entities/Product"; 
import ProductRepository from "../repositories/product.repository";
import { InvalidData, InvalidId } from "./errorMessages";
import { validateUpdatedProductData } from "./update-validation";
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

export async function updateProductService(productId: number, updatedProductData: Partial<Product>): Promise<Product> {
    if (!validateNumberId(productId)) throw new InvalidId("number");
    if (!validateUpdatedProductData(updatedProductData)) throw new InvalidData();

    return await ProductRepository.updateProduct(productId, updatedProductData);
}

export async function deleteProductService(productId: number) {
    return await ProductRepository.deleteProduct(productId);
}
