import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { CONSTANTS } from '../constants';
import { User } from './entities/user.entity';


@Module({
  controllers: [AuthController],
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      global: true,
      secret: CONSTANTS.JWT_SECRET,
      signOptions: { expiresIn: CONSTANTS.JWT_EXPIRY },
    }),
  ],
  providers: [AuthService],
})
export class AuthModule { }
