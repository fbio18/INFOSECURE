import { Column, OneToOne, Entity, BaseEntity, PrimaryGeneratedColumn, JoinTable, OneToMany, CreateDateColumn } from "typeorm";
import Client from "./Client";
import Invoice_type from "./Invoice_type";
import Invoice_Product from "./Invoice_product";

@Entity()
export default class Invoice extends BaseEntity {
    @PrimaryGeneratedColumn()
    order_number: number;

    @Column()
    emitter: string;

    @CreateDateColumn()
    emission_date: Date;

    @Column()
    total_amount: number;

    @OneToOne(() => Client)
    @JoinTable()
    client: Client;

    @OneToOne(() => Invoice_type)
    @JoinTable()
    invoice_type: Invoice_type;

    @OneToMany(() => Invoice_Product, (invoice_product) => invoice_product.invoice)
    invoice_products: Invoice_Product[];
}
