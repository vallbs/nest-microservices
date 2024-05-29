import { Injectable } from '@nestjs/common';
import { UserDocument } from './users/models/user.schema';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}
  login(user: UserDocument, response: Response) {
    const tokenPayload = { email: user.email, sub: user._id };

    const token = this.jwtService.sign(tokenPayload);

    const expires = new Date();
    expires.setSeconds(
      expires.getSeconds() + this.configService.get<number>('JWT_EXPIRES_IN'),
    );

    response.cookie('Authentication', token, {
      httpOnly: true,
      expires,
    });
  }
}
