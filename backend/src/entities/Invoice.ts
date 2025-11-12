import { Column, Entity, BaseEntity, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, OneToOne, JoinColumn } from "typeorm";
import Client from "./Client";
import Cart from "./Cart";

export type TInvoice_type = "A" | "B" | "C" | "E" | "M" | "T";

@Entity()
export default class Invoice extends BaseEntity {
    @PrimaryGeneratedColumn()
    order_number: number;

    @Column({ default: "InfoSecure S.A.S." })
    emitter: string;

    @CreateDateColumn()
    emission_date: Date;

    @Column()
    total_amount: number;

    @Column({ length: 1 })
    invoice_type: TInvoice_type;

    @ManyToOne(() => Client, (client) => client.invoices)
    client: Client;

    @OneToOne(() => Cart, (cart) => cart.invoice)
    @JoinColumn()
    cart: Cart;
}
