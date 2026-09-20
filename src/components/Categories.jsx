import { useEffect, useState } from "react";
import { decodeHtml } from "../utils/decodeHtml";

const API_URL = import.meta.env.VITE_API_URL;

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          `${API_URL}/wc/store/v1/products/categories?per_page=8`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }

        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Category fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <section className="py-16 sm:py-20 lg:py-24">
      <div className="site-container">
        {/* Header */}
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-gray-500">
              Shop By
            </p>

            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Categories
            </h2>
          </div>

          <a
            href="/shop"
            className="hidden text-sm font-medium underline underline-offset-4 sm:block"
          >
            View All
          </a>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="aspect-[4/5] animate-pulse bg-gray-100"
              />
            ))}
          </div>
        ) : categories.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {categories.map((category) => (
              <a
                key={category.id}
                href={`/shop?category=${category.slug}`}
                className="group relative block overflow-hidden bg-gray-100"
              >
                <div className="aspect-[4/5]">
                  {category.image ? (
                    <img
                      src={category.image.src}
                      alt={category.name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="h-full w-full bg-gray-200" />
                  )}
                </div>

                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4 pt-12">
                  <h3 className="text-lg font-semibold text-white">
                    {decodeHtml(category.name)}
                  </h3>

                  <p className="mt-1 text-sm text-white/80">
                    {category.count} Products
                  </p>
                </div>
              </a>
            ))}
          </div>
        ) : (
          <p className="py-10 text-center text-sm text-gray-500">
            No categories available.
          </p>
        )}

        {/* Mobile View All */}
        <div className="mt-8 text-center sm:hidden">
          <a
            href="/shop"
            className="text-sm font-medium underline underline-offset-4"
          >
            View All Categories
          </a>
        </div>
      </div>
    </section>
  );
}