import {useSelector} from 'react-redux';
import type {RootState} from '../store';
import CartItem from '../components/CartItem';

export default function Cart() {
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const totalItems = cartItems.reduce((acc, item) => acc + item.count, 0);
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.count,
    0
  );

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-8">
        <div className="text-3xl font-black text-gray-400">( Empty cart )</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <h1 className="text-4xl font-black text-purple-600 mb-2">
            Shopping Cart
          </h1>
          <p className="text-gray-600 text-lg font-semibold">
            You have {totalItems} items in your cart
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          <ul className="divide-y divide-gray-200">
            {cartItems.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </ul>
          <div className="bg-purple-50 p-6 flex flex-col sm:flex-row justify-between items-center border-t border-purple-100">
            <span className="text-2xl font-bold text-gray-800">Total:</span>
            <span className="text-4xl font-black text-purple-600">
              ${totalPrice.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
