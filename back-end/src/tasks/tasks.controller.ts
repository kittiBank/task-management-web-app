import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import {
  ApiMessageResponse,
  ApiResponse,
} from '../common/interfaces/api-response.interface';
import {
  successMessageResponse,
  successResponse,
} from '../common/utils/api-response.util';
import { CreateTaskDto } from './dto/create-task.dto';
import { FilterTasksDto } from './dto/filter-tasks.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskEntity } from './entities/task.entity';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  // Get all tasks by filter params
  @Get()
  async findAll(
    @Query() filter: FilterTasksDto,
  ): Promise<ApiResponse<{ tasks: TaskEntity[] }>> {
    const tasks = await this.tasksService.findAll(filter);
    return successResponse('Tasks retrieved successfully', { tasks });
  }

  // Create a new task by DTO
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() createTaskDto: CreateTaskDto,
  ): Promise<ApiResponse<{ task: TaskEntity }>> {
    const task = await this.tasksService.create(createTaskDto);
    return successResponse('Task created successfully', { task });
  }

  // Update a task by id and DTO
  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<ApiResponse<{ task: TaskEntity }>> {
    const task = await this.tasksService.update(id, updateTaskDto);
    return successResponse('Task updated successfully', { task });
  }

  // Delete a task by id
  @Delete(':id')
  async remove(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ApiMessageResponse> {
    await this.tasksService.remove(id);
    return successMessageResponse('Task deleted successfully');
  }
}
