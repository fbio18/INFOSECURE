import { Column, BaseEntity, Entity, PrimaryGeneratedColumn, ManyToMany } from "typeorm";
import Employee from "./Employee";

@Entity()
export default class Role extends BaseEntity {
    @PrimaryGeneratedColumn()
    role_id: number;

    @Column()
    name: string;

    @ManyToMany(() => Employee, (employee) => employee.role, { nullable: true })
    employee: Employee[];
}
