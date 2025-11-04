import { CreateDateColumn, Column, Entity, BaseEntity, PrimaryGeneratedColumn, ManyToOne, OneToMany, UpdateDateColumn } from "typeorm";
import User from "./User";
import Cart_Product from "./Cart_Product";

@Entity()
export default class Cart extends BaseEntity {
    @PrimaryGeneratedColumn()
    cart_id: number;

    @CreateDateColumn()
    creation_date: Date;

    @UpdateDateColumn()
    last_updated: Date;

    @ManyToOne(() => User, (user) => user.carts)
    user: User;

    @OneToMany(() => Cart_Product, (cart_product) => cart_product.cart)
    cart_products: Cart_Product[];
}
