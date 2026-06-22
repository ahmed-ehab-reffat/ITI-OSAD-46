import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from './todo.entity';
import { Repository } from 'typeorm';
import { DeleteResult } from 'typeorm/browser';

@Injectable()
export class TodoService {
  // private todos: Todo[] = [];

  constructor(
    @InjectRepository(Todo) private todoRepository: Repository<Todo>,
  ) {}

  async getAll(): Promise<Todo[]> {
    return await this.todoRepository.find();
  }

  async getById(id: number): Promise<Todo> {
    // const todo = this.todos.find((item) => item.id === id);

    const todo = await this.todoRepository.findOneBy({ id });

    if (!todo) {
      throw new NotFoundException('Todo not found');
    }

    return todo;
  }

  async create(payload: CreateTodoDto): Promise<Todo> {
    // const todo = new Todo(payload.task, payload.status ?? TodoStatus.TODO);
    // this.todos.push(todo);
    // return todo;

    const todo = this.todoRepository.create(payload);
    return await this.todoRepository.save(todo);
  }

  async update(id: number, payload: UpdateTodoDto): Promise<Todo> {
    const todo = await this.getById(id);

    Object.assign(todo, payload);

    return await this.todoRepository.save(todo);
  }

  async remove(id: number): Promise<DeleteResult> {
    // const index = this.todos.findIndex((item) => item.id === id);

    // if (index === -1) {
    //   throw new NotFoundException('Todo not found');
    // }

    // const todo = this.todos.splice(index, 1)[0];

    // return todo;

    return await this.todoRepository.delete(id);
  }
}
