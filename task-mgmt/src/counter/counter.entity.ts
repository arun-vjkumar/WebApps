import { ObjectID } from "mongodb";
import { BaseEntity, Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity('counter')
export class Counter extends BaseEntity {
    @PrimaryGeneratedColumn()
    _id: ObjectID;

    @Column()
    entity: string;

    @Column()
    max: number;
}