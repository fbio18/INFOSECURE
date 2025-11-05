import { Column, PrimaryGeneratedColumn, Entity, BaseEntity, OneToOne, JoinTable, ManyToMany } from "typeorm";
import Nationality from "./Nationality";
import Cart from "./Cart";

@Entity()
export default class Client extends BaseEntity {
    @PrimaryGeneratedColumn()
    client_id: number;

    @Column()
    business_name: string;

    @Column()
    phone_number: string;

    @Column()
    receptor_type: string;

    @OneToOne(() => Nationality)
    @JoinTable()
    nationality: Nationality;

    @ManyToMany(() => Cart)
    @JoinTable()
    carts: Cart[];
}
