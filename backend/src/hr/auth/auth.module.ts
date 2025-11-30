import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';

import { AuthGuard } from './auth.guard';
import { jwtConstants } from './constants';

@Module({
  imports:[JwtModule.register({
  global: true,
  secret: jwtConstants.secret,
  signOptions: { expiresIn: '30m' }
})
],
  controllers: [AuthController],
  providers: [AuthService,AuthGuard],
  exports:[AuthService]
})
export class AuthModule {}
