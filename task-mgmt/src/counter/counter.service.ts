import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Counter } from './counter.entity';
import { CounterRepository } from './counter.repository';

@Injectable()
export class CounterService {
    constructor(@InjectRepository(CounterRepository) private counterRepository: CounterRepository){}

    async getNextId(entity: string): Promise<string> {
        const counter = await this.counterRepository.findOne({"entity": entity});
        var max = counter.max;
        counter.max = max + 1;
        await counter.save();
        return `${entity.toUpperCase()[0]}${max}`
    }
}
