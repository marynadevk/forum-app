import { Module } from '@nestjs/common';
import { AuthController } from './v1/auth.controller.v1';
import { AuthService } from './v1/auth.service.v1';
import { AuthDao } from './v1/auth.dao.v1';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthV2Controller } from './v2/auth.controller.v2';
import { AuthV2Service } from './v2/auth.service.v2';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/database/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    ConfigModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get<string>('TOKEN_EXPIRES_IN'),
        },
      }),
    }),
  ],
  controllers: [AuthController, AuthV2Controller],
  providers: [AuthService, AuthV2Service, AuthDao, JwtStrategy],
  exports: [JwtModule, PassportModule],
})
export class AuthModule {}
