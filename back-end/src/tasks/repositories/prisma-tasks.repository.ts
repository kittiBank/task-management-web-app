import { Injectable } from '@nestjs/common';
import { Prisma } from '../../generated/prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateTaskDto } from '../dto/create-task.dto';
import { FilterTasksDto } from '../dto/filter-tasks.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';
import { TaskEntity } from '../entities/task.entity';
import { TaskMapper } from '../mappers/task.mapper';
import { TasksRepository } from './tasks.repository';

// Prisma tasks repository
@Injectable()
export class PrismaTasksRepository extends TasksRepository {
  constructor(private readonly prisma: PrismaService) {
    super();
  }

  // find all tasks by filter params
  async findAll(filter: FilterTasksDto): Promise<TaskEntity[]> {
    const where: Prisma.TaskWhereInput = {
      deletedAt: null,
      ...(filter.status && {
        status: TaskMapper.toPrismaStatus(filter.status),
      }),
    };

    const tasks = await this.prisma.task.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });

    return tasks.map((task) => TaskMapper.toEntity(task));
  }

  // find a task by id
  async findById(id: string): Promise<TaskEntity | null> {
    const task = await this.prisma.task.findFirst({
      where: { id, deletedAt: null },
    });

    return task ? TaskMapper.toEntity(task) : null;
  }

  // create a new task by DTO
  async create(data: CreateTaskDto): Promise<TaskEntity> {
    const task = await this.prisma.task.create({
      data: {
        title: data.title,
        description: data.description,
        ...(data.status && { status: TaskMapper.toPrismaStatus(data.status) }),
      },
    });

    return TaskMapper.toEntity(task);
  }

  // update a task by id and DTO
  async update(id: string, data: UpdateTaskDto): Promise<TaskEntity | null> {
    const existing = await this.findById(id);
    if (!existing) {
      return null;
    }

    const task = await this.prisma.task.update({
      where: { id },
      data: {
        ...(data.title !== undefined && { title: data.title }),
        ...(data.description !== undefined && {
          description: data.description,
        }),
        ...(data.status !== undefined && {
          status: TaskMapper.toPrismaStatus(data.status),
        }),
      },
    });

    return TaskMapper.toEntity(task);
  }

  // delete a task by id
  async remove(id: string): Promise<boolean> {
    const existing = await this.findById(id);
    if (!existing) {
      return false;
    }

    await this.prisma.task.update({
      where: { id },
      data: { deletedAt: new Date() },
    });

    return true;
  }
}
