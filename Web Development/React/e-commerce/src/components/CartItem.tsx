import {useDispatch} from 'react-redux';
import {removeFromCart, incrementCount, decrementCount} from '../store/cart';
import {Trash2, Minus, Plus} from 'lucide-react';

import type {CartItem} from '../store/cart';

interface Props {
  item: CartItem;
}

export default function CartItem({item}: Props) {
  const dispatch = useDispatch();
  const {id, title, price, thumbnail, count} = item;

  return (
    <li className="p-6 flex flex-col sm:flex-row items-center gap-6">
      <div className="h-24 w-24 bg-purple-50 rounded-xl overflow-hidden shrink-0">
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-full object-contain"
        />
      </div>

      <div className="flex-1 text-center sm:text-start">
        <h3 className="text-xl font-bold text-gray-900">{title}</h3>
        <p className="text-emerald-600 font-bold text-lg">
          ${price.toFixed(2)}
        </p>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center bg-gray-100 rounded-full">
          <button
            onClick={() => dispatch(decrementCount(id))}
            className="p-2 text-gray-600 hover:text-purple-600 transition"
          >
            <Minus size={20} />
          </button>
          <span className="w-8 text-center font-bold text-gray-900">
            {count}
          </span>
          <button
            onClick={() => dispatch(incrementCount(id))}
            className="p-2 text-gray-600 hover:text-purple-600 transition"
          >
            <Plus size={20} />
          </button>
        </div>

        <div className="w-24 text-right font-black text-gray-900 text-lg hidden sm:block">
          ${(price * count).toFixed(2)}
        </div>

        <button
          onClick={() => dispatch(removeFromCart(id))}
          className="p-3 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-full transition"
          title="Remove item"
        >
          <Trash2 size={24} />
        </button>
      </div>
    </li>
  );
}
