import { CreateDateColumn, Entity, BaseEntity, PrimaryGeneratedColumn, ManyToOne, OneToMany, UpdateDateColumn, Column } from "typeorm";
import Item from "./Item";
import Client from "./Client";

@Entity()
export default class Cart extends BaseEntity {
    @PrimaryGeneratedColumn()
    cart_id: number;

    @Column({ default: true })
    is_active: boolean;

    @CreateDateColumn()
    creation_date: Date;

    @UpdateDateColumn()
    last_updated: Date;

    @ManyToOne(() => Client, (client) => client.carts)
    client: Client;

    @OneToMany(() => Item, (item) => item.cart)
    products: Item[];
}
