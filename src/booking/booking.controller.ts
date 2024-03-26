import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, ParseIntPipe, Put, UseGuards } from '@nestjs/common';
import { BookingService } from './booking.service';
import { GetMerchantBookingsDto, UpdateBookingStatusBodyDto, UpdateBookingStatusParamsDto } from './dto';
import { UserRole } from 'src/auth/entities/user.entity';
import { Roles } from 'src/decorators';
import { AuthGuard } from 'src/guards/auth.guard';


@Controller('bookings')
export class BookingController {
  constructor(private readonly bookingService: BookingService) { }

  @Roles([UserRole.MERCHANT])
  @Get(':merchantId')
  async getMerchantBookings(@Param() params: GetMerchantBookingsDto) {
    return this.bookingService.getMerchantBookings(params.merchantId);
  }

  @Put(':bookingId/merchant/:merchantId/status')
  // @UseGuards(MerchantAuthGuard) // Protect the endpoint with a guard for merchants
  async updateBookingStatus(
    @Param() params: UpdateBookingStatusParamsDto,
    @Body() statusData: UpdateBookingStatusBodyDto,
  ) {
    return this.bookingService.updateBookingStatus(params.bookingId, params.merchantId, statusData.status);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookingService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateBookingDto: UpdateBookingDto) {
  //   return this.bookingService.update(+id, updateBookingDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookingService.remove(+id);
  }
}
