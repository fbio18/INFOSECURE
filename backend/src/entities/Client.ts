import { Column, PrimaryGeneratedColumn, Entity, BaseEntity, OneToOne, JoinTable } from "typeorm";
import Nationality from "./Nationality";
import Receptor_type from "./Receptor_type";

@Entity()
export default class Client extends BaseEntity {
    @PrimaryGeneratedColumn()
    client_id: number;

    @Column()
    business_name: string;

    @Column()
    phone_number: string;

    @OneToOne(() => Nationality)
    @JoinTable()
    nationality: Nationality;

    @OneToOne(() => Receptor_type)
    receptor_type: Receptor_type;
}
