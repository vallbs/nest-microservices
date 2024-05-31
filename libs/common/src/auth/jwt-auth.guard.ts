import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Inject,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable, map, tap } from 'rxjs';
import { AUTH_SERVICE } from '../constants/services';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(@Inject(AUTH_SERVICE) private readonly authClient: ClientProxy) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const jwt = context.switchToHttp().getRequest().cookies?.Authentication;
    console.log('SOA.JwtAuthGuard.canActivate.jwt: ', jwt);

    if (!jwt) {
      return false;
    }

    this.authClient.send('authenticate', { Authentication: jwt }).pipe(
      tap((user) => {
        context.switchToHttp().getRequest().user = user;
      }),
      map(() => true),
    );
  }
}
