import { User } from 'src/auth/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable, JoinColumn } from 'typeorm';
import { Service } from './service.entity';

export enum BOOKING_STATUS {
    PENDING = "pending",
    CANCELLED = "cancelled",
    COMPLETED = "completed",
}

@Entity()
export class Booking {

    @PrimaryGeneratedColumn()
    booking_id: number;

    @ManyToOne(() => User, user => user.customerBookings)
    @JoinColumn({ name: 'customer_id' })
    customer: User;

    @ManyToOne(() => User, user => user.merchantBookings)
    @JoinColumn({ name: 'merchant_id' })
    merchant: User;

    @ManyToMany(() => Service, service => service.bookings)
    @JoinTable()
    services: Service[];

    @Column({ type: 'date' })
    Date: Date;

    @Column({
        type: "enum",
        enum: BOOKING_STATUS,
        default: BOOKING_STATUS.PENDING,
    })
    Status: string;

}