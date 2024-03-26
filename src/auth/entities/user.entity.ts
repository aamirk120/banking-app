import { Booking } from 'src/booking/entities/booking.entity';
import { Service } from 'src/booking/entities/service.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

export enum UserRole {
    ADMIN = "admin",
    MERCHANT = "merchant",
    USER = "user",
}

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    user_id: number;

    @Column({
        type: 'varchar',
        nullable: true
    })
    firstName: string;

    @Column({
        type: 'varchar',
        nullable: true
    })
    lastName: string;

    @Column({
        type: 'varchar',
        unique: true,
    })
    email: string;

    @Column({
        type: 'varchar'
    })
    password: string;

    @Column({
        type: 'boolean',
        default: false
    })
    isEmailVerified: boolean;

    @Column({
        type: "enum",
        enum: UserRole,
        default: UserRole.USER,
    })
    role: UserRole

    @OneToMany(() => Booking, booking => booking.merchant)
    merchantBookings: Booking[];

    // Relationship with bookings where the user is a customer
    @OneToMany(() => Booking, booking => booking.customer)
    customerBookings: Booking[];

    @OneToMany(() => Service, service => service.merchant)
    services: Service[];

}