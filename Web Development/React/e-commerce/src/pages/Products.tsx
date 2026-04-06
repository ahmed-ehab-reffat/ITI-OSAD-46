import {useState, useEffect} from 'react';
import {Link} from 'react-router';
import axios from 'axios';
import {Star, ChevronLeft, ChevronRight} from 'lucide-react';

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  thumbnail: string;
  rating: number;
}

interface ApiResponse {
  products: Product[];
  total: number;
}

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const itemsPerPage = 12;

  useEffect(() => {
    async function getProducts() {
      const skip = (currentPage - 1) * itemsPerPage;
      const response = await axios.get<ApiResponse>(
        `https://dummyjson.com/products?limit=${itemsPerPage}&skip=${skip}`
      );

      setProducts(response.data.products);
      setTotalProducts(response.data.total);
    }

    getProducts();
  }, [currentPage]);

  const totalPages = Math.ceil(totalProducts / itemsPerPage);
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h1 className="text-5xl font-black text-purple-600 mb-2">
            Featured Products
          </h1>
          <p className="text-gray-600 text-lg">
            {(currentPage - 1) * itemsPerPage + 1}-
            {Math.min(currentPage * itemsPerPage, totalProducts)} of{' '}
            {totalProducts} items
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {products.map((product) => (
            <Link
              key={product.id}
              to={`/products/${product.id}`}
              className="group bg-white rounded-2xl border-2 border-purple-100 hover:border-emerald-400 shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden"
            >
              <div className="relative bg-purple-100 h-56 overflow-hidden">
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-500"
                />
              </div>
              <div className="p-5 space-y-3">
                <h3 className="font-bold text-gray-900 line-clamp-2 group-hover:text-purple-600 transition">
                  {product.title}
                </h3>
                <p className="text-gray-600 text-sm line-clamp-2">
                  {product.description}
                </p>
                <div className="flex justify-between items-center pt-2">
                  <span className="text-3xl font-black text-emerald-600">
                    ${product.price.toFixed(2)}
                  </span>
                  <div className="flex items-center gap-1 bg-yellow-50 px-3 py-1 rounded-full">
                    <Star size={16} className="text-yellow-500" />
                    <span className="text-sm font-semibold text-gray-700">
                      {product.rating.toFixed(1)}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="flex justify-center items-center gap-4">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={isFirstPage}
            className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-300 text-white px-6 py-3 rounded-full font-bold transition flex items-center gap-2 shadow-lg"
          >
            <ChevronLeft size={20} />
            Previous
          </button>
          <div className="bg-white border-2 border-purple-200 rounded-full px-6 py-3 font-bold text-gray-800 min-w-fit">
            Page {currentPage} of {totalPages}
          </div>
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={isLastPage}
            className="bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-300 text-white px-6 py-3 rounded-full font-bold transition flex items-center gap-2 shadow-lg"
          >
            Next
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
