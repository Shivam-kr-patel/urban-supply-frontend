import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Stores from "./pages/Stores";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/stores" element={<Stores />} />

        <Route
          path="/products/:id"
          element={<ProductDetails />}
        />

        <Route
          path="*"
          element={<Navigate to="/stores" replace />}
        />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;