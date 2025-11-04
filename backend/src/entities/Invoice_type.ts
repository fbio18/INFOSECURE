import { Column, PrimaryGeneratedColumn, BaseEntity, Entity } from "typeorm";

@Entity()
export default class Invoice_type extends BaseEntity {
    @PrimaryGeneratedColumn()
    invoice_type_id: number;

    @Column()
    name: string;
}
