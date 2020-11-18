import { User } from "src/auth/user.entity";
import { EntityRepository, getMongoRepository, Repository } from "typeorm";
import { CreateTaskDto } from "./dto/create-task.dto";
import { FilterTaskDto } from "./dto/filter-task.dto";
import { TaskStatus } from "./task-status.enum";
import { Task } from "./task.entity";

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
    async createTask(taskId: string, createTaskDto: CreateTaskDto, user: User): Promise<Task> {
        const { title, description } = createTaskDto;

        let task: Task = new Task();
        task.taskId = taskId;
        task.title = title;
        task.description = description;
        task.status = TaskStatus.OPEN;
        task.userId = user.userId;

        await task.save();
        return task;
    }

    async getTasks(filterTaskDto: FilterTaskDto, user: User): Promise<Task[]> {
        const {status, searchTerm} = filterTaskDto;
        const manager = getMongoRepository(Task);
        let query = {"userId": user.userId};

        if (status) {
            query['status'] = status;
        }
        if (searchTerm) {
            query["$text"] = {'$search': searchTerm};
        }
        const tasks = manager.find(query);
        return tasks;
    }
}