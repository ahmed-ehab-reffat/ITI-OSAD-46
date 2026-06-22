import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { TodoStatus } from './todos.type';

@Entity()
export class Todo {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  task!: string;

  @Column({
    type: 'enum',
    enum: TodoStatus,
    default: TodoStatus.TODO,
  })
  status!: string;
}
