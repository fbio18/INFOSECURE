import AppDataSource from "../db";
import Product from "../entities/Product";
import { NotFound } from "../services/errorMessages";
import { ProductValidated } from "../services/validation";
import ItemRepository from "./item.repository";

const ProductRepository = AppDataSource.getRepository(Product).extend({
    async createProduct(productData: ProductValidated): Promise<Product> {
        await this
        .createQueryBuilder("product")
        .insert()
        .values({
            name: productData.name,
            price: productData.price
        })
        .execute();

        const returnedProduct = await this
        .createQueryBuilder("product")
        .orderBy("product.product_id", "DESC")
        .getOne();

        if (!returnedProduct) throw new Error();

        return returnedProduct;
    },

    async readProduct(productId: number): Promise<Product> {
        const product = await this
        .createQueryBuilder("product")
        .where("product.product_id = :productId", { productId })
        .getOne();

        if (!product) throw new NotFound("product");

        return product;
    },

    async readAllProducts(): Promise<Product[]> {
        const products = await this
        .createQueryBuilder()
        .getMany();

        if (!products) throw new NotFound("product");

        return products;
    },

    async updateProduct(productId: number, updatedProductData: Partial<Product>) {
        await this
        .createQueryBuilder("product")
        .update()
        .set(updatedProductData)
        .where("product_id = :productId", { productId })
        .execute();

        const updatedProduct = await this.readProduct(productId);

        return updatedProduct;
    },

    async deleteProduct(productId: number): Promise<{ message: string }> {
        await ItemRepository.unAssignProductRelation(productId);

        await this
        .createQueryBuilder("product")
        .delete()
        .where("product_id = :productId", { productId })
        .execute();

        return { message: "El producto fue eliminado con éxito" };
    }
})

export default ProductRepository;
