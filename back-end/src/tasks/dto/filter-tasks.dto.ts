import { IsEnum, IsOptional } from 'class-validator';
import { TaskStatus } from '../../common/enums/task-status.enum';

export class FilterTasksDto {
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;
}
