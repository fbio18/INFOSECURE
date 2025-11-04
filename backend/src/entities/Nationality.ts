import { PrimaryGeneratedColumn, Column, BaseEntity, Entity } from "typeorm";

@Entity()
export default class Nationality extends BaseEntity {
    @PrimaryGeneratedColumn()
    nationality_id: number;

    @Column()
    name: string;
}
