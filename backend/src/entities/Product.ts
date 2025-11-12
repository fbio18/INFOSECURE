import { Column, Entity, BaseEntity, PrimaryGeneratedColumn, OneToMany, CreateDateColumn } from "typeorm";
import Item from "./Item";

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
}
