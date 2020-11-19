import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Counter } from './counter.entity';
import { CounterRepository } from './counter.repository';

@Injectable()
export class CounterService {
    constructor(@InjectRepository(CounterRepository) private counterRepository: CounterRepository){}

    async getNextId(entity: string): Promise<string> {
        let counter = await this.counterRepository.findOne({"entity": entity});
        console.log(counter);
        var max = counter.max;
        counter.max = max + 1;
        await this.counterRepository.update({"_id": counter._id}, {"max": (counter.max)})
        console.log(max);
        return `${entity.toUpperCase()[0]}${max}`
    }
}
