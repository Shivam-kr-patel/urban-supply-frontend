import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

const API_URL = import.meta.env.VITE_API_URL;

export default function NewArrivals() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `${API_URL}/wc/store/v1/products?per_page=20&orderby=date&order=desc`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch new arrivals");
        }

        const data = await response.json();
        setProducts(data .slice(0, 5)); // Get the first 5 products
      } catch (error) {
        console.error("New arrivals error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section className="py-16 sm:py-20 lg:py-24">
      <div className="site-container">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-gray-500">
              Latest Collection
            </p>

            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              New Arrivals
            </h2>
          </div>

          <a
            href="/shop"
            className="hidden text-sm font-medium underline underline-offset-4 sm:block"
          >
            View All
          </a>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-5">
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
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="py-10 text-center text-sm text-gray-500">
            No new arrivals available.
          </p>
        )}

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