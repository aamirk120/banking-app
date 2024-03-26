import { IsEnum, IsInt, IsNumberString, Min } from 'class-validator';
import { BOOKING_STATUS } from '../entities/booking.entity';
import { Transform } from 'class-transformer';

export class GetMerchantBookingsDto {
  @IsNumberString()
  merchantId: number;
}
export class UpdateBookingStatusBodyDto {
  @IsEnum(BOOKING_STATUS)
  status: BOOKING_STATUS;
}

export class UpdateBookingStatusParamsDto {
  @Transform(({ value }) => parseInt(value))
  @IsInt()
  merchantId: number;

  @Transform(({ value }) => parseInt(value))
  @IsInt()
  bookingId: number;
}