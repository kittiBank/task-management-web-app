import { Module } from '@nestjs/common';
import { PrismaTasksRepository } from './repositories/prisma-tasks.repository';
import { TasksRepository } from './repositories/tasks.repository';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

@Module({
  controllers: [TasksController],
  providers: [
    TasksService,
    {
      provide: TasksRepository,
      useClass: PrismaTasksRepository,
    },
  ],
  exports: [TasksService],
})
export class TasksModule {}
