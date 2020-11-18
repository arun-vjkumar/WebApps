import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CounterRepository } from './counter.repository';
import { CounterService } from './counter.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([CounterRepository])
    ],
    providers: [CounterService],
    exports: [CounterService]
})
export class CounterModule { }
