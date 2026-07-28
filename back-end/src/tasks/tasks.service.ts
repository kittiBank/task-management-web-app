import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { FilterTasksDto } from './dto/filter-tasks.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskEntity } from './entities/task.entity';
import { TasksRepository } from './repositories/tasks.repository';

@Injectable()
export class TasksService {
  constructor(private readonly tasksRepository: TasksRepository) {}

  // get all tasks by filter params
  findAll(filter: FilterTasksDto): Promise<TaskEntity[]> {
    return this.tasksRepository.findAll(filter);
  }

  // Create a new task by DTO
  create(createTaskDto: CreateTaskDto): Promise<TaskEntity> {
    return this.tasksRepository.create(createTaskDto);
  }

  // update a task by id and DTO
  async update(id: string, updateTaskDto: UpdateTaskDto): Promise<TaskEntity> {
    const task = await this.tasksRepository.update(id, updateTaskDto);
    if (!task) {
      throw new NotFoundException(`Task with id "${id}" not found`);
    }
    return task;
  }

  // delete a task by id
  async remove(id: string): Promise<void> {
    const deleted = await this.tasksRepository.remove(id);
    if (!deleted) {
      throw new NotFoundException(`Task with id "${id}" not found`);
    }
  }
}
