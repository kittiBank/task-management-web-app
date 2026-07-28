import { Controller } from '@nestjs/common';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  // Endpoints will be implemented later:
  // GET    /tasks
  // POST   /tasks
  // PUT    /tasks/:id
  // DELETE /tasks/:id
}
