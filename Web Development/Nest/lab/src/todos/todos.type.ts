export enum TodoStatus {
  TODO = 'todo',
  IN_PROGRESS = 'in-progress',
  DONE = 'done',
}

export class Todo {
  private static nextId = 1;

  id: number;
  task: string;
  status: TodoStatus;

  constructor(task: string, status: TodoStatus = TodoStatus.TODO) {
    this.id = Todo.nextId++;
    this.task = task;
    this.status = status;
  }
}
