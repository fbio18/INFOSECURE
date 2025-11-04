import { Column, PrimaryGeneratedColumn, BaseEntity, Entity } from "typeorm";

@Entity()
export default class Receptor_type extends BaseEntity {
    @PrimaryGeneratedColumn()
    receptor_type_id: number;

    @Column()
    name: string;
}
