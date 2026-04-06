import type Todo from '../models/todo.ts';
import TodoItem from './TodoItem.tsx';
import {CheckCircle2} from 'lucide-react';

type Props = {
  todos: Todo[];
  removeTodo: (id: string) => void;
};

export default function Todos({todos, removeTodo}: Props) {
  return (
    <>
      {todos.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <CheckCircle2 size={48} className="text-slate-300 mb-3" />
          <p className="text-slate-500 text-lg font-medium">
            No tasks yet. Time to get productive! 🎯
          </p>
        </div>
      )}
      {todos.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center gap-2 mb-4">
            <h3 className="text-lg font-semibold text-slate-700">
              Tasks ({todos.length})
            </h3>
          </div>
          <ul className="space-y-2">
            {todos.map((todo) => (
              <TodoItem
                key={todo.id}
                text={todo.text}
                removeTodo={() => removeTodo(todo.id)}
              />
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
