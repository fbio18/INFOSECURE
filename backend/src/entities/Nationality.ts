import { PrimaryGeneratedColumn, Column, BaseEntity, Entity, OneToMany } from "typeorm";
import Client from "./Client";

@Entity()
export default class Nationality extends BaseEntity {
    @PrimaryGeneratedColumn()
    nationality_id: number;

    @Column()
    name: string;

    @OneToMany(() => Client, (client) => client.nationality)
    clients: Client[];
}
