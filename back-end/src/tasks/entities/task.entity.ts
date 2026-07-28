import { TaskStatus } from '../../common/enums/task-status.enum';

export class TaskEntity {
  id!: string;
  title!: string;
  description!: string | null;
  status!: TaskStatus;
  created_at!: string;
  updated_at!: string;
}
