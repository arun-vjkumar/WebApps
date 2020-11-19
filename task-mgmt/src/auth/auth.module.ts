import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CounterModule } from 'src/counter/counter.module';
import { CounterRepository } from 'src/counter/counter.repository';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { UserRepository } from './user.repository';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: "jwt"}),
    JwtModule.register({
      secret: "topSecret24",
      signOptions: {
        expiresIn: 3600
      },
    }),
    TypeOrmModule.forFeature([UserRepository, CounterRepository]),
    CounterModule
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy
  ],
  exports: [
    JwtStrategy,
    PassportModule
  ]
})
export class AuthModule {}
