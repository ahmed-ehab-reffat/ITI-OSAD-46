import {Link} from 'react-router';

function HomePage() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4">
      <h1 className="text-6xl font-black text-purple-600 mb-4 text-center">
        Welcome to Giza Shop
      </h1>
      <p className="text-xl text-gray-600 mb-10 max-w-2xl text-center leading-relaxed">
        Discover amazing products at incredible prices. Browse our exclusive
        collection and find exactly what you're looking for.
      </p>
      <div className="flex gap-4 flex-wrap justify-center">
        <Link
          to="/products"
          className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-4 px-10 rounded-full shadow-lg transition duration-300 transform hover:scale-110 flex items-center gap-2"
        >
          Explore Products
        </Link>
      </div>
    </div>
  );
}

export default HomePage;
