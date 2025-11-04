import { Column, BaseEntity, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class Role extends BaseEntity {
    @PrimaryGeneratedColumn()
    role_id: number;

    @Column()
    name: string;
}
