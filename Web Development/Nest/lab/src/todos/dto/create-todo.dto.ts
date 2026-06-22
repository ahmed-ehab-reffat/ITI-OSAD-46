import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { TodoStatus } from '../todos.type';

export class CreateTodoDto {
  @IsString()
  @IsNotEmpty()
  task!: string;

  @IsOptional()
  @IsEnum(TodoStatus)
  status?: TodoStatus;
}
