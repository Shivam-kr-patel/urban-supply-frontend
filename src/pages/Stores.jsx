import { useEffect, useState } from "react";
import { getProducts } from "../api/products";
import ProductCard from "../components/ProductCard";

function Stores() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

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

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-gray-50 py-8 sm:py-12">
      <div className="site-container">

        {/* Search */}
        <div className="mb-8">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            className="w-full border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-black rounded-[10px]"
          />
        </div>

        {/* Loading */}
        {loading && (
          <p className="text-gray-600">
            Loading products...
          </p>
        )}

        {/* Error */}
        {error && (
          <p className="text-red-600">
            Error: {error}
          </p>
        )}

        {/* Products */}
        {!loading && !error && (
          <>
            <div className="mb-6 flex items-center justify-between">
              <p className="text-sm text-gray-500">
                {filteredProducts.length} products
              </p>
            </div>

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                  />
                ))}
              </div>
            ) : (
              <p className="py-16 text-center text-gray-500">
                No products found.
              </p>
            )}
          </>
        )}
      </div>
    </main>
  );
}

export default Stores;