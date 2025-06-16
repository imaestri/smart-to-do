import { Injectable, NotFoundException } from '@nestjs/common';

import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { GetTasksFilterDto } from './dto/get-task.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];
  private nextId = 1;

  findAll(filterDto: GetTasksFilterDto): Task[] {
    const { done } = filterDto;

    if (done === undefined) {
      return this.tasks;
    }

    const isDone = done === 'true';
    return this.tasks.filter((task) => task.done === isDone);
  }

  findOne(id: number): Task {
    const task = this.tasks.find((t) => t.id === id);
    if (!task) throw new NotFoundException(`Task with id ${id} not found`);
    return task;
  }

  create(dto: CreateTaskDto): Task {
    const newTask: Task = {
      id: this.nextId++,
      title: dto.title,
      description: dto.description || '',
      done: dto.done || false,
    };
    this.tasks.push(newTask);
    return newTask;
  }

  update(id: number, dto: UpdateTaskDto): Task {
    const task = this.findOne(id);
    Object.assign(task, dto);
    return task;
  }

  remove(id: number): void {
    const index = this.tasks.findIndex((t) => t.id === id);
    if (index === -1)
      throw new NotFoundException(`Task with id ${id} not found`);
    this.tasks.splice(index, 1);
  }
}
