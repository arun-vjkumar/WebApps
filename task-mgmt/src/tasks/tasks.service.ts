import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { CounterService } from 'src/counter/counter.service';
import { ObjectID } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { FilterTaskDto } from './dto/filter-task.dto';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';
import { TaskRepository } from './task.repository';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TaskRepository) private taskRepository: TaskRepository,
        private counterService: CounterService
    ) {}
    
    async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
        const taskId = await this.counterService.getNextId('task')
        return this.taskRepository.createTask(taskId, createTaskDto, user);
    }

    async getTasks(filterTaskDto: FilterTaskDto, user: User): Promise<Task[]> {
        return this.taskRepository.getTasks(filterTaskDto, user);
    }

    async getAllTasks(): Promise<Task[]> {
        return await this.taskRepository.find();
    }

    async getTaskById(id: string): Promise<Task> {
        const task = await this.taskRepository.findOne({_id: id});
        if (!task) {
            throw new NotFoundException(`Task with Id: ${id} not found`)
        }
        return task;
    }

    async deleteTaskById(id: string): Promise<string> {
        const result = await this.taskRepository.delete(id);
        if (result.affected == 0) {
            return `Task with Id: ${id} not found`
        }
        return `Deleted ${result.affected} records`
    }

    async updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
        const task = await this.getTaskById(id)
        task.status = status;
        task.save();
        return task;
    }

}
