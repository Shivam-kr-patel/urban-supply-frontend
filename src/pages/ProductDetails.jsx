import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getProduct } from "../api/products";

function ProductDetails() {
  // Get the product ID from the URL.
  //
  // Example:
  // /products/13
  //
  // id will be "13"
  const { id } = useParams();

  // Store the product returned from WooCommerce.
  const [product, setProduct] = useState(null);

  // Used while the API request is running.
  const [loading, setLoading] = useState(true);

  // Stores an error message if the API request fails.
  const [error, setError] = useState(null);

  // Quantity selected by the customer.
  const [quantity, setQuantity] = useState(1);

  // Fetch the product whenever the URL ID changes.
  //
  // Example:
  // /products/13 → getProduct("13")
  // /products/15 → getProduct("15")
  useEffect(() => {
    getProduct(id)
      .then((data) => {
        setProduct(data);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  // -----------------------------
  // Loading state
  // -----------------------------

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 px-4 py-12">
        <div className="mx-auto max-w-7xl">
          <p className="text-center text-gray-600">
            Loading product...
          </p>
        </div>
      </main>
    );
  }

  // -----------------------------
  // Error state
  // -----------------------------

  if (error) {
    return (
      <main className="min-h-screen bg-gray-50 px-4 py-12">
        <div className="mx-auto max-w-7xl text-center">
          <p className="mb-4 text-red-600">
            Error: {error}
          </p>

          <Link
            to="/stores"
            className="inline-block rounded-lg bg-black px-5 py-3 font-medium text-white hover:bg-gray-800"
          >
            Back to Store
          </Link>
        </div>
      </main>
    );
  }

  // -----------------------------
  // Product details
  // -----------------------------

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">

        {/* Back to store */}
        <Link
          to="/stores"
          className="mb-8 inline-flex items-center text-sm font-medium text-gray-600 transition hover:text-black"
        >
          ← Back to Store
        </Link>

        {/* Product container */}
        <div className="grid overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm md:grid-cols-2">

          {/* =========================
              Product Image
          ========================== */}

          <div className="bg-gray-100">
            {product.images.length > 0 ? (
              <img
                src={product.images[0].src}
                alt={product.images[0].alt || product.name}
                className="h-full min-h-[400px] w-full object-cover"
              />
            ) : (
              <div className="flex min-h-[400px] items-center justify-center text-gray-400">
                No image available
              </div>
            )}
          </div>

          {/* =========================
              Product Information
          ========================== */}

          <div className="flex flex-col p-6 sm:p-8 lg:p-10">

            {/* Category */}

            {product.categories.length > 0 && (
              <p className="mb-3 text-sm font-medium uppercase tracking-wide text-gray-500">
                {product.categories[0].name}
              </p>
            )}

            {/* Product name */}

            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {product.name}
            </h1>

            {/* Rating */}

            <div className="mt-3 flex items-center gap-2">
              <span className="text-yellow-500">
                ★
              </span>

              <span className="text-sm text-gray-600">
                {product.average_rating} ({product.review_count} reviews)
              </span>
            </div>

            {/* Price */}

            <p className="mt-6 text-3xl font-bold text-gray-900">
              {product.prices.currency_symbol}
              {(Number(product.prices.price) / 100).toFixed(2)}
            </p>

            {/* Short description */}

            <div
              className="mt-6 text-gray-600"
              dangerouslySetInnerHTML={{
                __html: product.short_description,
              }}
            />

            {/* Stock status */}

            <div className="mt-6">
              {product.is_in_stock ? (
                <p className="font-medium text-green-600">
                  In stock
                </p>
              ) : (
                <p className="font-medium text-red-600">
                  Out of stock
                </p>
              )}
            </div>

            {/* Divider */}

            <div className="my-6 border-t border-gray-200" />

            {/* Quantity + Add to Cart */}

            {product.is_purchasable && product.is_in_stock && (
              <div className="flex flex-col gap-4 sm:flex-row">

                {/* Quantity selector */}

                <div className="flex items-center rounded-lg border border-gray-300">

                  <button
                    type="button"
                    onClick={() =>
                      setQuantity((current) =>
                        Math.max(1, current - 1)
                      )
                    }
                    className="px-4 py-3 text-lg text-gray-600 hover:bg-gray-100"
                  >
                    −
                  </button>

                  <span className="min-w-12 text-center font-medium">
                    {quantity}
                  </span>

                  <button
                    type="button"
                    onClick={() =>
                      setQuantity((current) =>
                        Math.min(
                          product.add_to_cart.maximum,
                          current + 1
                        )
                      )
                    }
                    className="px-4 py-3 text-lg text-gray-600 hover:bg-gray-100"
                  >
                    +
                  </button>

                </div>

                {/* Add to Cart */}

                <button
                  type="button"
                  className="flex-1 rounded-lg bg-black px-6 py-3 font-semibold text-white transition hover:bg-gray-800 active:scale-[0.98]"
                >
                  Add to Cart
                </button>

              </div>
            )}

            {/* Product information */}

            <div className="mt-8 space-y-3 text-sm text-gray-600">

              <p>
                <span className="font-medium text-gray-900">
                  SKU:
                </span>{" "}
                {product.sku || "N/A"}
              </p>

              <p>
                <span className="font-medium text-gray-900">
                  Availability:
                </span>{" "}
                {product.stock_availability.text || "In stock"}
              </p>

            </div>

          </div>
        </div>

        {/* =========================
            Full Description
        ========================== */}

        {product.description && (
          <section className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">

            <h2 className="text-2xl font-bold text-gray-900">
              Product Description
            </h2>

            <div
              className="prose mt-4 max-w-none text-gray-600"
              dangerouslySetInnerHTML={{
                __html: product.description,
              }}
            />

          </section>
        )}

      </div>
    </main>
  );
}

export default ProductDetails;