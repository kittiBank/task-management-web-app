import { TaskStatus as PrismaTaskStatus } from '../../generated/prisma/client';
import { TaskStatus } from '../../common/enums/task-status.enum';
import { toBangkokIsoString } from '../../common/utils/datetime.util';
import { TaskEntity } from '../entities/task.entity';

// Prisma task record type
type PrismaTaskRecord = {
  id: string;
  title: string;
  description: string | null;
  status: PrismaTaskStatus;
  createdAt: Date;
  updatedAt: Date;
};

// Prisma to API status mapper
const PRISMA_TO_API_STATUS: Record<PrismaTaskStatus, TaskStatus> = {
  [PrismaTaskStatus.TODO]: TaskStatus.TODO,
  [PrismaTaskStatus.IN_PROGRESS]: TaskStatus.IN_PROGRESS,
  [PrismaTaskStatus.DONE]: TaskStatus.DONE,
};

// API to Prisma status mapper
const API_TO_PRISMA_STATUS: Record<TaskStatus, PrismaTaskStatus> = {
  [TaskStatus.TODO]: PrismaTaskStatus.TODO,
  [TaskStatus.IN_PROGRESS]: PrismaTaskStatus.IN_PROGRESS,
  [TaskStatus.DONE]: PrismaTaskStatus.DONE,
};

// Task mapper class
export class TaskMapper {
  static toEntity(task: PrismaTaskRecord): TaskEntity {
    return {
      id: task.id,
      title: task.title,
      description: task.description,
      status: PRISMA_TO_API_STATUS[task.status],
      created_at: toBangkokIsoString(task.createdAt),
      updated_at: toBangkokIsoString(task.updatedAt),
    };
  }

  static toPrismaStatus(status: TaskStatus): PrismaTaskStatus {
    return API_TO_PRISMA_STATUS[status];
  }
}
