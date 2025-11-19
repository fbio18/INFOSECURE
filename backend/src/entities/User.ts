import { Column, Entity, BaseEntity, PrimaryGeneratedColumn, OneToOne, JoinColumn } from "typeorm";
import Employee from "./Employee";
import Client from "./Client";

@Entity()
export default class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    user_id: number;

    @Column()
    username: string;

    @Column({ default: "user" })
    role: string;

    @Column({ unique: true })
    email: string;

    @Column({ default: false })
    hasVerifiedEmail: boolean;

    @Column({ select: false })
    password: string;

    @Column({ default: 0 })
    last_time_spend_on_page: number;

    @OneToOne(() => Employee, (employee) => employee.user)
    @JoinColumn()
    employee: Employee;

    @OneToOne(() => Client)
    @JoinColumn()
    client: Client;

}
