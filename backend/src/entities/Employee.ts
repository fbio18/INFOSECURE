import { Column, BaseEntity, Entity, PrimaryGeneratedColumn, CreateDateColumn, OneToOne, ManyToMany, JoinTable } from "typeorm";
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
    @JoinTable()
    role: Role[];

    @CreateDateColumn()
    start_date: Date;

    @Column({ nullable: true })
    leave_date: Date;

    @Column({ default: false })
    is_in_license: boolean;

    @Column({ default: true })
    is_working: boolean;

    @OneToOne(() => User, (user) => user.employee)
    user: User;
}
