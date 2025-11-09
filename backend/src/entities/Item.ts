import { Column, Entity, BaseEntity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Cart from "./Cart";
import Product from "./Product";

@Entity()
export default class Item extends BaseEntity {
    @PrimaryGeneratedColumn()
    item_id: number;

    @Column()
    cart_id: number;

    @Column()
    product_id: number;

    @ManyToOne(() => Cart, (cart) => cart.items)
    cart: Cart;

    @ManyToOne(() => Product, (product) => product.item) 
    product: Product;

    @Column()
    quantity: number;
}
