import { Column, PrimaryGeneratedColumn, Entity, BaseEntity, OneToOne, JoinTable, ManyToMany } from "typeorm";
import Nationality from "./Nationality";
import Cart from "./Cart";
import User from "./User";

@Entity()
export default class Client extends BaseEntity {
    @PrimaryGeneratedColumn()
    client_id: number;

    @Column()
    business_name: string;

    @Column()
    phone_number: string;

    @Column({ length: 1 })
    receptor_type: string;

    @OneToOne(() => Nationality)
    @JoinTable()
    nationality: Nationality;

    @ManyToMany(() => Cart)
    @JoinTable()
    carts: Cart[];

    @OneToOne(() => User, (user) => user.client)
    user: User;
}
