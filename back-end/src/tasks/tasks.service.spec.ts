import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TaskStatus } from '../common/enums/task-status.enum';
import { TasksRepository } from './repositories/tasks.repository';
import { TasksService } from './tasks.service';

describe('TasksService', () => {
  let service: TasksService;

  // Mock repository methods
  const repositoryMock = {
    findAll: jest.fn(),
    findById: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  // Mock task data
  const task = {
    id: '9403bd21-a70c-45e5-849e-21ea6b55a5a1',
    title: 'Do homework',
    description: 'Math assignment',
    status: TaskStatus.TODO,
    created_at: '2026-07-28T15:10:25.294+07:00',
    updated_at: '2026-07-28T15:10:25.294+07:00',
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: TasksRepository,
          useValue: repositoryMock,
        },
      ],
    }).compile();

    service = module.get<TasksService>(TasksService);
  });

  // Case:
  it('returns all tasks', async () => {
    repositoryMock.findAll.mockResolvedValue([task]);

    const result = await service.findAll({});

    expect(result).toEqual([task]);
    expect(repositoryMock.findAll).toHaveBeenCalledWith({});
  });

  // Case: Creates a task
  it('creates a task', async () => {
    const createTaskDto = {
      title: 'Do homework',
      description: 'Math assignment',
      status: TaskStatus.TODO,
    };

    repositoryMock.create.mockResolvedValue(task);

    const result = await service.create(createTaskDto);

    expect(result).toEqual(task);
    expect(repositoryMock.create).toHaveBeenCalledWith(createTaskDto);
  });

  // Case: Updates a task
  it('updates a task', async () => {
    const updateTaskDto = {
      title: 'Finish homework',
      status: TaskStatus.DONE,
    };
    const updatedTask = {
      ...task,
      ...updateTaskDto,
      updated_at: '2026-07-28T16:10:25.294+07:00',
    };

    repositoryMock.update.mockResolvedValue(updatedTask);

    const result = await service.update(task.id, updateTaskDto);

    expect(result).toEqual(updatedTask);
    expect(repositoryMock.update).toHaveBeenCalledWith(task.id, updateTaskDto);
  });

  // Case: updates a missing task
  it('throws when updating a missing task', async () => {
    repositoryMock.update.mockResolvedValue(null);

    await expect(
      service.update('missing-id', { title: 'Missing task' }),
    ).rejects.toThrow(NotFoundException);
  });

  // Case: Removes a task
  it('removes a task', async () => {
    repositoryMock.remove.mockResolvedValue(true);

    await expect(service.remove(task.id)).resolves.toBeUndefined();
    expect(repositoryMock.remove).toHaveBeenCalledWith(task.id);
  });

  // Case: removes a missing task
  it('throws when removing a missing task', async () => {
    repositoryMock.remove.mockResolvedValue(false);

    await expect(service.remove('missing-id')).rejects.toThrow(
      NotFoundException,
    );
  });
});
