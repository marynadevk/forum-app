import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/database/entities/user.entity';

@Injectable()
export class TokenService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}
  private jwtOptions = {
    secret: this.configService.get<string>('JWT_SECRET'),
  };
  generateToken(user: User) {
    const payload = {
      username: user.username,
      sub: user.id,
      email: user.email,
      avatar: user.avatar,
    };
    return {
      access_token: this.jwtService.sign(payload, this.jwtOptions),
    };
  }
}
