import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { ProtectedRouteGuard } from './protected-route-guard';

// JWT uses base64 converting the binary data into HTTP header supportable text format
// JWT esnures Integrity (nothing is changed) rather than secrey (no one read it)
// JWT toke = HEADER(base 64) + PAYLOAD(base64) + signtaure(created using secret)
// Integrity is checked using signature

// stateless jwt 
// statefull maintaining session 

// Two ways of sending
// Bearer token in header
// cookie -> expires in -> send by browser to server container JWT token
@Module({
  imports: [JwtModule.register({
    global: true,
    signOptions: {
      expiresIn: '1h'
    }
  })],
  controllers: [AuthController],
  providers: [AuthService, {
    provide: APP_GUARD,
    useClass: ProtectedRouteGuard
  }]
})
export class AuthModule { }
