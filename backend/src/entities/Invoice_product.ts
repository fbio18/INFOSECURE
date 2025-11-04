import { Column, Entity, BaseEntity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Invoice from "./Invoice";
import Product from "./Product";

@Entity()
export default class Invoice_Product extends BaseEntity {
    @PrimaryGeneratedColumn()
    invoice_product_id: number;

    @Column()
    invoiceId: number;

    @Column()
    productId: number;

    @ManyToOne(() => Invoice, (invoice) => invoice.invoice_products)
    invoice: Invoice;

    @ManyToOne(() => Product, (product) => product.invoice_products)
    product: Product;

    @Column()
    quantity: number;
}
