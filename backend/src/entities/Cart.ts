import { CreateDateColumn, Entity, BaseEntity, PrimaryGeneratedColumn, ManyToOne, OneToMany, UpdateDateColumn } from "typeorm";
import Cart_Product from "./Cart_Product";
import Client from "./Client";

@Entity()
export default class Cart extends BaseEntity {
    @PrimaryGeneratedColumn()
    cart_id: number;

    @CreateDateColumn()
    creation_date: Date;

    @UpdateDateColumn()
    last_updated: Date;

    @ManyToOne(() => Client, (client) => client.carts)
    client: Client;

    @OneToMany(() => Cart_Product, (cart_product) => cart_product.cart)
    cart_products: Cart_Product[];
}
