import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CounterModule } from 'src/counter/counter.module';
import { TaskRepository } from './task.repository';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([TaskRepository]),
    TasksModule,
    CounterModule
  ],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
