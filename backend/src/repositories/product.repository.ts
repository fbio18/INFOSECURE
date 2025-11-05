import AppDataSource from "../db";
import Product from "../entities/Product";
import { MissingData } from "../services/errorMessages";

const ProductRepository = AppDataSource.getRepository(Product).extend({
    async createProduct(productData: Partial<Product>): Promise<Product> {
        if (!productData.name || !productData.price) throw new MissingData();

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

        if (!product) throw new Error();

        return product;
    },

    async readAllProducts(): Promise<Product[]> {
        const products = await this
        .createQueryBuilder()
        .getMany();

        if (!products) throw new Error();

        return products;
    },

    async updateProduct() {
        const updatedProduct = await this
        .createQueryBuilder()
        .update()
        .set({})
        .where({})
        .execute();

        if (!updatedProduct) throw new Error();

        return updatedProduct;
    },

    async deleteProduct(productId: number) {
        await this
        .createQueryBuilder("product")
        .delete()
        .where("product.id = :productId", { productId })
        .execute();
    }
})

export default ProductRepository;
