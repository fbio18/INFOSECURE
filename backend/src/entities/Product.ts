import { Column, Entity, BaseEntity, PrimaryGeneratedColumn, OneToMany, CreateDateColumn } from "typeorm";
import Cart_Product from "./Cart_Product";
import Invoice_Product from "./Invoice_product";

@Entity()
export default class Product extends BaseEntity {
    @PrimaryGeneratedColumn()
    product_id: number;

    @Column()
    name: string;

    @Column()
    price: number;
    
    @CreateDateColumn()
    release_date: Date;

    @OneToMany(() => Cart_Product, (cart_product) => cart_product.product)
    cart_products: Cart_Product[];

    @OneToMany(() => Invoice_Product, (invoice_product) => invoice_product.product)
    invoice_products: Invoice_Product[];
}
