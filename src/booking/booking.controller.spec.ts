import { Test, TestingModule } from '@nestjs/testing';
import { BookingController } from './booking.controller';
import { BookingService } from './booking.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Booking } from './entities/booking.entity';
import { Repository } from 'typeorm';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('BookingController', () => {

  let controller: BookingController;
  let bookingService: BookingService;
  let bookingRepository: Repository<Booking>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookingController],
      providers: [
        BookingService,
        {
          provide: getRepositoryToken(Booking),
          useClass: Repository,
        },
        {
          provide: 'UserRepository', // Provide a mock repository for User entity
          useClass: Repository,
        },
      ],
    }).compile();

    controller = module.get<BookingController>(BookingController);
    bookingService = module.get<BookingService>(BookingService);
    bookingRepository = module.get<Repository<Booking>>(getRepositoryToken(Booking));
  });

  it('should return merchant bookings', async () => {
    const mockMerchantId = 1;
    const mockBookings = [
      {
        booking_id: 1,
        Date: new Date(),
        Status: 'pending',
        customerId: 1,
        firstName: 'John',
        lastName: 'Doe',
        services: [],
      },
      {
        booking_id: 2,
        Date: new Date(),
        Status: 'completed',
        customerId: 2,
        firstName: 'Jane',
        lastName: 'Doe',
        services: [],
      },
    ];

    jest.spyOn(bookingService, 'getMerchantBookings').mockResolvedValue(mockBookings);

    const result = await controller.getMerchantBookings({ merchantId: mockMerchantId });

    expect(result).toEqual(mockBookings);
  });

  it('should throw NotFoundException when booking not found', async () => {
    const mockMerchantId = 1;

    jest.spyOn(bookingService, 'getMerchantBookings').mockResolvedValue([]);

    try {
      await controller.getMerchantBookings({ merchantId: mockMerchantId });
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException);
      expect(error.message).toBe('No bookings found for merchant ID 1');
    }
  });

  // Add more test cases for other controller methods if needed
});
