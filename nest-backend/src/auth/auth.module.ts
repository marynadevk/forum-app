import { Module } from '@nestjs/common';
import { AuthController } from './v1/auth.controller.v1';

@Module({
  controllers: [AuthController],
})
export class AuthModule {}
