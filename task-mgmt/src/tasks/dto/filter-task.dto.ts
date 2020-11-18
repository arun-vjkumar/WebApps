import { IsIn, IsNotEmpty, IsOptional } from "class-validator";
import { TaskStatus } from "../task-status.enum";


export class FilterTaskDto {
    @IsOptional()
    @IsIn([TaskStatus.DONE, TaskStatus.OPEN, TaskStatus.IN_PROGRESS])
    status;

    @IsOptional()
    @IsNotEmpty()
    searchTerm: string;
}