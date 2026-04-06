import {Trash2, CheckCircle} from 'lucide-react';
import {useState} from 'react';

type Props = {
  text: string;
  removeTodo: () => void;
};

function TodoItem({text, removeTodo}: Props) {
  const [isCompleted, setIsCompleted] = useState(false);

  const handleComplete = () => {
    setIsCompleted(!isCompleted);
  };

  return (
    <li className="flex items-center gap-3 p-4 bg-white rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition-all duration-200 group">
      <button
        onClick={handleComplete}
        className="shrink-0 flex items-center justify-center transition-colors duration-200"
      >
        <CheckCircle
          size={24}
          className={`transition-colors duration-200 ${
            isCompleted
              ? 'text-green-500'
              : 'text-slate-300 hover:text-green-300'
          }`}
        />
      </button>
      <span
        className={`flex-1 text-lg transition-all duration-200 ${
          isCompleted ? 'text-slate-400 line-through' : 'text-slate-800'
        }`}
      >
        {text}
      </span>
      <button
        onClick={removeTodo}
        className="shrink-0 flex items-center justify-center p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-all duration-200 opacity-0 group-hover:opacity-100"
        title="Delete task"
      >
        <Trash2 size={20} />
      </button>
    </li>
  );
}

export default TodoItem;
