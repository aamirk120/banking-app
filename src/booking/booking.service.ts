import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BOOKING_STATUS, Booking } from './entities/booking.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BookingService {

  constructor(
    @InjectRepository(Booking)
    private bookingRepository: Repository<Booking>
  ) { }

  async getMerchantBookings(merchantId: number) {
    const merchantBookings = await this.bookingRepository.find({
      where: { merchant: { user_id: merchantId } },
      relations: ['customer', 'services'],
    });

    return merchantBookings.map(booking => ({
      booking_id: booking.booking_id,
      Date: booking.Date,
      Status: booking.Status,
      customerId: booking.customer.user_id,
      firstName: booking.customer.firstName,
      lastName: booking.customer.lastName,
      services: booking.services
    }));

  }
  // create(createBookingDto: CreateBookingDto) {
  //   return 'This action adds a new booking';
  // }

  async updateBookingStatus(booking_id: number, merchant_id: number, status: BOOKING_STATUS) {
    const booking = await this.bookingRepository.findOne({
      where: { booking_id },
      relations: ['merchant'],
    });

    if (!booking) {
      throw new NotFoundException(`Booking with ID ${booking_id} not found`);
    }

    console.log({ bm: booking.merchant.user_id, merchant_id });

    if (booking.merchant.user_id !== merchant_id) {
      throw new ForbiddenException(`You are not authorized to update this booking`);
    }

    booking.Status = status;
    return this.bookingRepository.save(booking);
  }

  findOne(id: number) {
    return `This action returns a #${id} booking`;
  }

  // update(id: number, updateBookingDto: UpdateBookingDto) {
  //   return `This action updates a #${id} booking`;
  // }

  remove(id: number) {
    return `This action removes a #${id} booking`;
  }
}

