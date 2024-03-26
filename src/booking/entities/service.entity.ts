import { User } from 'src/auth/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, ManyToMany } from 'typeorm';
import { Booking } from './booking.entity';

@Entity()
export class Service {

    @PrimaryGeneratedColumn()
    service_id: number;

    @Column({
        type: 'varchar',
        nullable: true
    })
    name: string;

    @Column("text", { nullable: true })
    description: string;

    @Column("decimal", { precision: 10, scale: 2 })
    price: number;

    @ManyToOne(() => User, user => user.services)
    @JoinColumn({ name: 'merchant_id' })
    merchant: User;

    @ManyToMany(() => Booking, booking => booking.services)
    bookings: Booking[];
}