import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 500, unique: true })
    email: string;

    @Column()
    password: string;

    @Column('text', { nullable: true })
    refreshToken: string;

    @Column('text', { nullable: true })
    firstName?: string;

    @Column('text', { nullable: true })
    lastName?: string;

    @Column('text', { nullable: true })
    number?: string;

    @Column('text', { nullable: true })
    address?: string;

    @Column('text', { nullable: true })
    description?: string;
}
