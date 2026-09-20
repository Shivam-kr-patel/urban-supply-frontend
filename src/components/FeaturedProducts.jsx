import { useEffect, useState } from "react";
import { getProducts } from "../api/products";
import ProductCard from "./ProductCard";

function FeaturedProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await getProducts({
          featured: true,
          per_page: 5,
        });

        setProducts(data);
      } catch (error) {
        console.error("Failed to load featured products:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  return (
    <section className="px-6 py-16 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-gray-500">
              Urban Supply
            </p>

            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Featured Products
            </h2>
          </div>

          <a
            href="/shop"
            className="hidden text-sm font-medium underline underline-offset-4 sm:block"
          >
            View All
          </a>
        </div>

        {/* Products */}
        {loading ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className="aspect-[3/4] animate-pulse bg-gray-100"
              />
            ))}
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-5">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        ) : (
          <p className="py-10 text-center text-sm text-gray-500">
            No featured products available.
          </p>
        )}

        {/* Mobile View All */}
        <div className="mt-8 text-center sm:hidden">
          <a
            href="/shop"
            className="text-sm font-medium underline underline-offset-4"
          >
            View All Products
          </a>
        </div>

      </div>
    </section>
  );
}

export default FeaturedProducts;