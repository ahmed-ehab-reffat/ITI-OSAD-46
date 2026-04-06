import {NavLink} from 'react-router';
import {useDispatch, useSelector} from 'react-redux';
import {ShoppingCart} from 'lucide-react';
import {useContext} from 'react';
import type {RootState} from '../store';
import {LanguageContext} from '../contexts/LanguageContext';
import {logout} from '../store/auth';

export default function MainNavigation() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const cartItemCount = cartItems.reduce(
    (total, item) => total + item.count,
    0
  );

  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  const {language, switchLanguage} = useContext(LanguageContext);

  return (
    <header className="bg-purple-600 shadow-xl sticky top-0 z-50">
      <nav className="max-w-6xl mx-auto px-4 h-20 flex items-center justify-between text-white">
        <span className="text-2xl font-black tracking-wider">Giza-Shop</span>
        <div className="flex items-center gap-10">
          <ul className="flex gap-10">
            <li>
              <NavLink
                to="/"
                className={({isActive}) =>
                  isActive
                    ? 'font-bold border-b-3 border-yellow-300 pb-1'
                    : 'font-semibold hover:text-yellow-300 transition'
                }
                end
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/products"
                className={({isActive}) =>
                  isActive
                    ? 'font-bold border-b-3 border-yellow-300 pb-1'
                    : 'font-semibold hover:text-yellow-300 transition'
                }
                end
              >
                Products
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact-us"
                className={({isActive}) =>
                  isActive
                    ? 'font-bold border-b-3 border-yellow-300 pb-1'
                    : 'font-semibold hover:text-yellow-300 transition'
                }
                end
              >
                Contact
              </NavLink>
            </li>
            {!isAuthenticated && (
              <li>
                <NavLink
                  to="/register"
                  className={({isActive}) =>
                    isActive
                      ? 'font-bold border-b-3 border-yellow-300 pb-1'
                      : 'font-semibold hover:text-yellow-300 transition'
                  }
                  end
                >
                  Register
                </NavLink>
              </li>
            )}
            {isAuthenticated && (
              <li>
                <button
                  type="button"
                  onClick={() => dispatch(logout())}
                  className="cursor-pointer font-semibold hover:text-yellow-300 transition"
                >
                  Logout
                </button>
              </li>
            )}
          </ul>

          <span
            onClick={switchLanguage}
            className="bg-purple-700 text-white uppercase font-bold py-1 px-3 rounded outline-none border border-transparent hover:border-purple-300 cursor-pointer appearance-none text-center"
          >
            {language}
          </span>

          {isAuthenticated && (
            <NavLink
              to="/cart"
              className={({isActive}) =>
                `relative flex items-center ${isActive ? 'text-yellow-300' : 'hover:text-yellow-300 transition'}`
              }
            >
              <ShoppingCart size={28} />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-yellow-400 text-purple-900 text-xs font-black rounded-full h-5 w-5 flex items-center justify-center shadow">
                  {cartItemCount}
                </span>
              )}
            </NavLink>
          )}
        </div>
      </nav>
    </header>
  );
}
