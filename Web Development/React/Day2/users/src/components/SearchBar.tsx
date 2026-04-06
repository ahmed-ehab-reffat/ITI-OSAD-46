import {type FormEvent} from 'react';

type Props = {
  setEmailFilter: (email: string) => void;
};

export default function SearchBar({setEmailFilter}: Props) {
  function submitHandler(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = (formData.get('email') as string).trim();

    setEmailFilter(email);
  }

  function handleReset() {
    setEmailFilter('');
  }

  return (
    <form onSubmit={submitHandler} className="mb-8">
      <div className="flex gap-3">
        <input
          name="email"
          className="flex-1 px-4 py-3 rounded-lg border-2 border-gray-200 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
          type="text"
          placeholder="Search by email..."
        />
        <button
          type="submit"
          className="px-6 py-3 bg-linear-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-md hover:shadow-lg active:scale-95"
        >
          Search
        </button>
        <button
          type="button"
          onClick={handleReset}
          className="px-6 py-3 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 transition-all duration-200 active:scale-95"
        >
          Reset
        </button>
      </div>
    </form>
  );
}
