import { useEffect, useState } from "react";
import { getProducts } from "./api/products";
import ProductCard from "./components/ProductCard";

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getProducts()
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <>
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {loading && <p>Loading products...</p>}
      {error && <p>Error: {error}</p>}
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
      </div>
    </>
  );
}

export default App;