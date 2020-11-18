import { userInfo } from "os";
import { User } from "src/auth/user.entity";
import { BaseEntity, Column, Entity, Index, ManyToOne, ObjectID, ObjectIdColumn, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { TaskStatus } from "./task-status.enum";


@Entity('task')
export class Task extends BaseEntity {
    @PrimaryColumn()
    _id: string

    @Column()
    taskId: string

    @Column()
    title: string

    @Column()
    description: string

    @Column()
    status: TaskStatus

    @Column()
    userId: string;

}