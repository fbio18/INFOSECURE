import { Column, Entity, BaseEntity, PrimaryGeneratedColumn, OneToMany, CreateDateColumn } from "typeorm";
import Client from "./Client";
import Invoice_Product from "./Invoice_product";

type TInvoice_type = "A" | "B" | "C" | "E" | "M" | "T";

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

    @OneToMany(() => Client, (client) => client.invoices)
    client: Client;

    @Column({ length: 1 })
    invoice_type: TInvoice_type;

    @OneToMany(() => Invoice_Product, (invoice_product) => invoice_product.invoice)
    invoice_products: Invoice_Product[];
}
