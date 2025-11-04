import { Column, Entity, BaseEntity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import Cart from "./Cart";
import Product from "./Product";

@Entity()
export default class Cart_Product extends BaseEntity {
    @PrimaryGeneratedColumn()
    cart_product_id: number;

    @Column()
    cart_id: number;

    @Column()
    product_id: number;

    @ManyToOne(() => Cart, (cart) => cart.cart_products)
    cart: number;

    @ManyToOne(() => Product, (product) => product.cart_products)
    product: number;

    @Column()
    quantity: number;
}
