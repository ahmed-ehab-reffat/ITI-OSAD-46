import {useState} from 'react';
import Todo from './models/todo.ts';
import NewTodo from './components/NewTodo';
import Todos from './components/Todos';
import Header from './components/Header.tsx';
import Footer from './components/Footer.tsx';

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([]);

  function addTodo(text: string) {
    const newTodo = new Todo(text);
    setTodos((prevTodos) => prevTodos.concat(newTodo));
  }

  function removeTodo(id: string) {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-slate-50 to-blue-100 py-8 px-4">
      <main className="max-w-2xl mx-auto">
        <Header />

        <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-100">
          <NewTodo addTodo={addTodo} />
          <hr className="my-6 border-slate-200" />
          <Todos todos={todos} removeTodo={removeTodo} />
        </div>

        <Footer />
      </main>
    </div>
  );
}
