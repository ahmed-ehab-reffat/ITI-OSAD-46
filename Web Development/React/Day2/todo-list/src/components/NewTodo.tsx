import {useState, type ChangeEvent, type FormEvent} from 'react';
import {Plus} from 'lucide-react';

type Props = {
  addTodo: (text: string) => void;
};

export default function NewTodo({addTodo}: Props) {
  const [enteredTodo, setEnteredTodo] = useState<string>('');

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setEnteredTodo(event.target.value);
  }

  function submitHandler(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (enteredTodo.trim() === '') return;
    addTodo(enteredTodo);
    setEnteredTodo('');
  }

  return (
    <form onSubmit={submitHandler} className="flex gap-2 mb-6">
      <input
        className="flex-1 px-4 py-3 rounded-lg border-2 border-slate-200 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
        type="text"
        placeholder="Add a new task..."
        value={enteredTodo}
        onChange={handleChange}
      />
      <button
        type="submit"
        className="px-6 py-3 bg-linear-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-md hover:shadow-lg flex items-center gap-2 active:scale-95"
      >
        <Plus size={20} />
        Add
      </button>
    </form>
  );
}
