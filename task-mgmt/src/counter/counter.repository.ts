import { EntityRepository, Repository } from "typeorm";
import { Counter } from "./counter.entity";

@EntityRepository(Counter)
export class CounterRepository extends Repository<Counter> {

}