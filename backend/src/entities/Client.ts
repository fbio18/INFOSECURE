import { Column, PrimaryGeneratedColumn, Entity, BaseEntity, OneToOne, JoinTable, ManyToMany, OneToMany, ManyToOne } from "typeorm";
import Nationality from "./Nationality";
import Cart from "./Cart";
import User from "./User";
import Invoice from "./Invoice";

export type Receptor_type = "consumidor-final" | "monotributista" | "responsable-inscripto" | "exportacion" | "turista-extranjero";

@Entity()
export default class Client extends BaseEntity {
    @PrimaryGeneratedColumn()
    client_id: number;

    @Column()
    business_name: string;

    @Column()
    phone_number: string;

    @Column()
    receptor_type: Receptor_type;

    @ManyToOne(() => Nationality, (nationality) => nationality.clients)
    nationality: Nationality;

    @ManyToOne(() => Cart, (cart) => cart.client)
    carts: Cart[];

    @OneToOne(() => User, (user) => user.client)
    user: User;

    @OneToMany(() => Invoice, (invoice) => invoice.client)
    invoices: Invoice[];
}
