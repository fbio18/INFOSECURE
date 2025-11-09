import { Column, Entity, BaseEntity, PrimaryGeneratedColumn, OneToMany, CreateDateColumn } from "typeorm";
import Item from "./Item";
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

    @OneToMany(() => Item, (item) => item.product)
    item: Item[];

    @OneToMany(() => Invoice_Product, (invoice_product) => invoice_product.product)
    invoice_products: Invoice_Product[];
}
