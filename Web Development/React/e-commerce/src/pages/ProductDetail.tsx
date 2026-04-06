import {useState, useEffect} from 'react';
import {Link, useParams, useNavigate} from 'react-router';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import {addToCart} from '../store/cart';
import type {RootState} from '../store';
import {ChevronLeft} from 'lucide-react';

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  thumbnail: string;
  images: string[];
  rating: number;
  stock: number;
  brand: string;
  category: string;
}

export default function ProductDetail() {
  const {id} = useParams<{id: string}>();
  const [product, setProduct] = useState<Product | null>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  useEffect(() => {
    async function fetchProductDetail(id: string) {
      const response = await axios.get<Product>(
        `https://dummyjson.com/products/${id}`
      );
      setProduct(response.data);
    }

    if (id) fetchProductDetail(id);
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-100 p-8">
        <Link
          to=".."
          relative="path"
          className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 mb-8 font-bold text-lg"
        >
          <ChevronLeft size={20} />
          Back
        </Link>
        <div className="text-gray-600 text-center text-xl font-semibold">
          Product not found
        </div>
      </div>
    );
  }

  const displayImage = product.images[0];

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <Link
          to=".."
          relative="path"
          className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 mb-8 font-bold text-lg transition"
        >
          <ChevronLeft size={20} />
          Back
        </Link>

        <div className="grid md:grid-cols-2 gap-10">
          <div className="bg-purple-100 rounded-2xl overflow-hidden flex items-center justify-center p-4 shadow-lg">
            <img
              src={displayImage}
              alt={product.title}
              className="w-full h-full object-contain"
            />
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <span className="inline-block bg-purple-100 text-purple-700 px-4 py-1 rounded-full text-sm font-bold">
                {product.category}
              </span>
              <h1 className="text-4xl font-black text-gray-900">
                {product.title}
              </h1>
            </div>

            <div className="flex gap-4 text-lg font-bold">
              <div>⭐ {product.rating.toFixed(1)}/5</div>
              <div
                className={
                  product.stock > 0
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-700'
                    : 'bg-red-50 border-red-300 text-red-700'
                }
              >
                {product.stock > 0 ? `In Stock` : 'Out of Stock'}
              </div>
            </div>

            {product.brand && (
              <p className="text-gray-600 text-lg">
                <span className="font-bold text-gray-900">Brand:</span>{' '}
                {product.brand}
              </p>
            )}

            <p className="text-gray-700 leading-relaxed text-base">
              {product.description}
            </p>

            <div className="border-t-2 border-purple-200" />
            <p className="text-5xl font-black text-purple-600 pb-4">
              ${product.price.toFixed(2)}
            </p>
            <button
              disabled={product.stock === 0}
              onClick={() => {
                if (!isAuthenticated) {
                  navigate('/register');
                } else {
                  dispatch(addToCart(product));
                }
              }}
              className="w-full bg-purple-600 hover:bg-purple-700 hover:cursor-pointer disabled:bg-gray-400 text-white font-bold py-4 rounded-xl transition text-lg shadow-lg"
            >
              {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
