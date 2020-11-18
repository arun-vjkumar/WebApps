import { ObjectID } from "mongodb";
import { BaseEntity, Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, Unique } from "typeorm";
import * as bycrypt from "bcrypt";
import { Task } from "src/tasks/task.entity";


@Entity('user')
@Unique(["_id", "username"])
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    _id: ObjectID;

    @Column()
    userId: string;

    @Column()
    username: string;

    @Column()
    password: string;

    @Column()
    salt: string;

    async isValidPassword(password: string): Promise<boolean> {
        const hash = await bycrypt.hash(password, this.salt);
        return hash === this.password;
    }
}