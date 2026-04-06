import {ListTodo} from 'lucide-react';

export default function Header() {
  return (
    <header className="mb-8 text-center">
      <div className="flex items-center justify-center gap-3 mb-2">
        <div className="p-3 bg-linear-to-r from-blue-500 to-blue-600 rounded-lg shadow-lg">
          <ListTodo size={32} className="text-white" />
        </div>
        <h1 className="text-4xl font-bold text-slate-900">TaskMaster</h1>
      </div>
      <p className="text-slate-600 text-lg">
        Stay organized and track your daily tasks
      </p>
    </header>
  );
}
