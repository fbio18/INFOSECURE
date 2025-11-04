import { Column, Entity, BaseEntity, PrimaryGeneratedColumn, OneToOne, JoinColumn, OneToMany, ManyToMany, JoinTable } from "typeorm";
import Employee from "./Employee";
import Client from "./Client";
import Cart from "./Cart";

@Entity()
export default class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    last_time_spend_on_page: number;

    @OneToOne(() => Employee)
    @JoinColumn()
    employee: Employee;

    @OneToOne(() => Client)
    @JoinColumn()
    client: Client;

    @ManyToMany(() => Cart)
    @JoinTable()
    carts: Cart[];
}
