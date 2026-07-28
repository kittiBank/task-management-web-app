import { CreateTaskDto } from '../dto/create-task.dto';
import { FilterTasksDto } from '../dto/filter-tasks.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';
import { TaskEntity } from '../entities/task.entity';

export abstract class TasksRepository {
  abstract findAll(filter: FilterTasksDto): Promise<TaskEntity[]>;
  abstract findById(id: string): Promise<TaskEntity | null>;
  abstract create(data: CreateTaskDto): Promise<TaskEntity>;
  abstract update(id: string, data: UpdateTaskDto): Promise<TaskEntity | null>;
  abstract remove(id: string): Promise<boolean>;
}
