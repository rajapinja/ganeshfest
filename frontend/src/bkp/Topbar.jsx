import { useContext } from "react";
import { ThemeContext } from "../ThemeContext";
import { Sun, Moon, Search, ShoppingCart } from "lucide-react";
import ganeshaIcon from "../images/ganesha.avif";
import { useCart } from "../store/useCart";

export default function Topbar({
  title = "🕉️ Vinayaka Services",
  onSearch,
  onCartClick,
}) {
  const { theme, toggle } = useContext(ThemeContext);
  const items = useCart((s) => s.items);
  const subtotal = useCart((s) => s.subtotal());

  const totalItems = items.reduce((sum, i) => sum + i.qty, 0);

  return (
    <header className="w-full py-4 px-6 bg-gradient-to-r from-slate-900 via-orange-800 to-green-900 dark:from-gray-700 dark:via-gray-900 dark:to-black shadow-md rounded">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Logo + Caption */}
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-gradient-to-r from-blue-200 via-pink-200 to-yellow-200 flex items-center justify-center text-pink-800 font-bold shadow">
            <img
              src={ganeshaIcon}
              alt="Vinayaka Icon"
              className="w-11 h-11 rounded-full object-contain"
            />
          </div>

          <div className="flex flex-col">
            <h1 className="text-lg md:text-xl font-bold text-gray-200 dark:text-gray-300">
              {title} <sup>v1.0.0</sup>
            </h1>
            <span className="text-xs italic font-medium bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
              Your complete Ganesh Chaturthi services partner
            </span>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex items-center md:w-1/4 relative">
          <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5 pointer-events-none" />
          <input
            type="text"
            placeholder="Search services..."
            className="w-full p-2 pl-10 rounded-lg 
                       text-gray-900 dark:text-white
                       placeholder-gray-500 dark:placeholder-gray-400
                       bg-white dark:bg-gray-700
                       focus:outline-none focus:ring-2 focus:ring-pink-500"
            onChange={(e) => onSearch?.(e.target.value)}
          />
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-3 ml-auto">
          
          {/* Cart Button with Info */}
          <button
            onClick={onCartClick}
            className="relative flex items-center gap-2 px-3 py-2 bg-yellow-500 rounded-lg text-white hover:scale-105 transition"
          >
            <ShoppingCart className="w-5 h-5" />
            <span>Cart</span>
            {totalItems > 0 && (
              <span className="ml-2 text-sm font-semibold bg-white/20 rounded px-2 py-0.5">
                {totalItems} - ₹{subtotal.toFixed(0)}
              </span>
            )}
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggle}
            className="flex items-center gap-2 px-4 py-2 bg-white/20 dark:bg-gray-700 rounded-lg text-white hover:scale-105 transition"
            title="Toggle Theme"
          >
            {theme === "dark" ? (
              <>
                <Sun className="w-5 h-5" /> Light
              </>
            ) : (
              <>
                <Moon className="w-5 h-5" /> Dark
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
