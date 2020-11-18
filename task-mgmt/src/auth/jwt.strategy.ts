import { Options, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { JwtPayload } from './jwt-payload';
import { UserRepository } from './user.repository';


export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository
    ) {
        super(
            {
                jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
                secretOrKey: 'topSecret24'
            }
        )
    }

    async validate(payload: JwtPayload) {
        const { username } = payload;
        const user = await this.userRepository.findOne({
            where: {
                username
            },
            select: ['userId', 'username']
        });

        if (!user) {
            throw new UnauthorizedException()
        }
        return user;
    }
}