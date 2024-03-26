import { Reflector } from '@nestjs/core';
import { UserRole } from 'src/auth/entities/user.entity';

export const Roles = Reflector.createDecorator<UserRole[]>();