import { Column, BaseEntity, Entity, PrimaryGeneratedColumn, CreateDateColumn } from "typeorm";

@Entity()
export default class Employee extends BaseEntity {
    @PrimaryGeneratedColumn()
    employee_id: number;

    @Column()
    dni: string;

    @Column()
    surnames: string;

    @Column()
    names: string;

    @Column()
    salary: number;

    @CreateDateColumn()
    start_date: Date;

    @Column({ default: false })
    is_in_license: boolean;
}
