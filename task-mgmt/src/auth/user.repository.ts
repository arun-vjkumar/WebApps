import { ConflictException, Inject } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import * as bcrypt from "bcrypt";
import { AuthCredentialsDto } from "./dtos/auth-credentials.dto";
import { User } from "./user.entity";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    async signup(userId: string, authCredentialsDto: AuthCredentialsDto): Promise<void> {
        const { username, password } = authCredentialsDto;

        const user = new User();
        user.userId = userId
        user.username = username; 
        console.log(user);
        user.salt = await bcrypt.genSalt();
        console.log(user);
        user.password = await this.getPasswordHash(password, user.salt);

        
        try {
            await user.save()
        } catch (error) {
            if (error.code === 11000) {
                throw new ConflictException("username exists");
            }
            throw error;          
        }
    }

    async validateUserPassword(authCredentialsDto: AuthCredentialsDto): Promise<string> {
        const { username, password } = authCredentialsDto;
        const user = await this.findOne({username});
        if (user && await user.isValidPassword(password)) {
            return user.username;
        }
        return null;
    }

    async getPasswordHash(password: string, salt: string): Promise<string> {
        return await bcrypt.hash(password, salt);
    }
}