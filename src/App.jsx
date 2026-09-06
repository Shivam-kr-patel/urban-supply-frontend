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
import { useCart } from "./context/CartContext";
import Checkout from "./pages/Checkout";
function Navbar() {
  const { cartCount } = useCart();

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
          <Link
            to="/checkout"
            className="text-sm font-semibold text-gray-900 transition hover:text-gray-600"
          >
            Checkout
          </Link>
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
