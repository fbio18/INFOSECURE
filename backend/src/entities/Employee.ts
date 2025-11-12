import { Column, BaseEntity, Entity, PrimaryGeneratedColumn, CreateDateColumn, OneToOne, ManyToMany, JoinColumn } from "typeorm";
import User from "./User";
import Role from "./Role";

@Entity()
export default class Employee extends BaseEntity {
    @PrimaryGeneratedColumn()
    employee_id: number;

    @Column({ unique: true })
    dni: string;

    @Column()
    surnames: string;

    @Column()
    names: string;

    @Column()
    salary: number;

    @ManyToMany(() => Role, (role) => role.employee)
    @JoinColumn()
    role: Role[];

    @CreateDateColumn()
    start_date: Date;

    @Column({ default: false })
    is_in_license: boolean;

    @OneToOne(() => User, (user) => user.employee)
    user: User;
}
