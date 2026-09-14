import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Link,
} from "react-router-dom";

import Stores from "./pages/Stores";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Account from "./pages/Account";

import { useCart } from "./context/CartContext";
import { useAuth } from "./context/AuthContext";

function Navbar() {
  const { cartCount } = useCart();
  const { loading, isLoggedIn } = useAuth();

  return (
    <nav className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">

        {/* Brand */}
        <Link
          to="/stores"
          className="text-xl font-bold tracking-tight text-gray-900"
        >
          Urban Supply
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-6">
          <Link
            to="/stores"
            className="text-sm font-medium text-gray-600 transition hover:text-black"
          >
            Store
          </Link>

          <Link
            to="/cart"
            className="text-sm font-semibold text-gray-900 transition hover:text-gray-600"
          >
            Cart ({cartCount})
          </Link>

          <div className="flex items-center gap-2">
            {!loading && isLoggedIn ? (
              <Link
                to="/account"
                className="rounded-lg bg-black px-4 py-2 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5"
              >
                Account
              </Link>
            ) : (
              <>
                <Link
                  to="/login"
                  className="rounded-lg bg-black px-4 py-2 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5"
                >
                  Sign In
                </Link>

                <Link
                  to="/register"
                  className="rounded-lg px-4 py-2 text-sm font-semibold text-gray-900 transition-all duration-300 hover:bg-gray-100 hover:-translate-y-0.5"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route
          path="/stores"
          element={<Stores />}
        />

        <Route
          path="/products/:id"
          element={<ProductDetails />}
        />

        <Route
          path="/cart"
          element={<Cart />}
        />

        <Route
          path="/checkout"
          element={<Checkout />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/account"
          element={<Account />}
        />

        <Route
          path="*"
          element={<Navigate to="/stores" replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;