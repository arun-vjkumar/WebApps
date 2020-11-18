import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { CounterService } from 'src/counter/counter.service';
import { AuthCredentialsDto } from './dtos/auth-credentials.dto';
import { JwtPayload } from './jwt-payload';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository) private userRepository: UserRepository,
        private jwtService: JwtService,
        private counterService: CounterService
    ) { }

    async signup(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        // const userId = await this.counterService.getNextId('user')
        return this.userRepository.signup("U1", authCredentialsDto);
    }

    async signin(authCredentialsDto: AuthCredentialsDto): Promise<{accessToken: string}> {
        const username = await this.userRepository.validateUserPassword(authCredentialsDto);
        if (!username) {
            throw new UnauthorizedException("invalid credentials");
        }

        const payload: JwtPayload = { username };
        const accessToken = await this.jwtService.sign(payload);

        return { accessToken };
    }
}
