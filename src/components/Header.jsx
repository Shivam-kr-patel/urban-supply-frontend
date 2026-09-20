import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

function Header() {
  const {
    loading,
    isAuthenticated,
  } = useAuth();

  const { cart } = useCart();

  const cartCount = cart?.reduce(
    (total, item) => total + item.quantity,
    0
  ) || 0;

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Logo */}
        <Link
          to="/"
          className="shrink-0 text-xl font-bold tracking-tight text-gray-900 sm:text-2xl"
        >
          Urban Supply
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          <Link
            to="/"
            className="text-sm font-medium text-gray-600 transition hover:text-gray-900"
          >
            Home
          </Link>

          <Link
            to="/stores"
            className="text-sm font-medium text-gray-600 transition hover:text-gray-900"
          >
            Shop
          </Link>
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-2 sm:gap-3">

          {/* Cart */}
          <Link
            to="/cart"
            className="relative flex h-10 w-10 items-center justify-center rounded-full text-gray-700 transition hover:bg-gray-100 hover:text-gray-900"
            aria-label="Cart"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.8"
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437m0 0L6.75 14.25a2.25 2.25 0 002.182 1.704h7.636a2.25 2.25 0 002.182-1.704l1.644-6.144a.75.75 0 00-.725-.944H5.106m0 0L4.5 4.5m4.5 14.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm8.25 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
              />
            </svg>

            {/* Cart Count */}
            {cartCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-gray-900 px-1 text-[10px] font-bold text-white">
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            )}
          </Link>

          {/* Authentication */}
          {loading ? (
            <div className="h-10 w-10 animate-pulse rounded-full bg-gray-100" />
          ) : isAuthenticated ? (
            /* Account */
            <Link
              to="/account"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-gray-50 text-gray-700 transition hover:border-gray-300 hover:bg-gray-100 hover:text-gray-900"
              aria-label="My Account"
              title="My Account"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.8"
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6.75a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75a17.933 17.933 0 01-7.499-1.632z"
                />
              </svg>
            </Link>
          ) : (
            /* Logged Out */
            <>
              <Link
                to="/login"
                className="hidden text-sm font-medium text-gray-600 transition hover:text-gray-900 sm:block"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="rounded-full bg-gray-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-gray-800 sm:px-5"
              >
                Sign Up
              </Link>
            </>
          )}

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full text-gray-700 transition hover:bg-gray-100 md:hidden"
            aria-label="Open menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.8"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>

        </div>
      </div>
    </header>
  );
}

export default Header;
