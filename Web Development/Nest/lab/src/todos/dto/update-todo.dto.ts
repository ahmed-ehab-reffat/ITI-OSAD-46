import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { TodoStatus } from '../todos.type';

export class UpdateTodoDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  task?: string;

  @IsOptional()
  @IsEnum(TodoStatus)
  status?: TodoStatus;
}
