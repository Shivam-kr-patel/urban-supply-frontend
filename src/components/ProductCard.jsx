import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function ProductCard({ product }) {
  const { addToCart } = useCart();

  const price =
    Number(product.prices?.price || 0) / 100;

  const currencySymbol =
    product.prices?.currency_symbol || "₹";

  const handleAddToCart = () => {
    addToCart({
      ...product,
      quantity: 1,
    });
  };

  return (
    <article className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <Link to={`/products/${product.id}`}>
        <div className="aspect-square overflow-hidden bg-gray-100">
          {product.images?.length > 0 ? (
            <img
              src={product.images[0].src}
              alt={
                product.images[0].alt ||
                product.name
              }
              className="h-full w-full object-cover transition duration-300 hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-gray-400">
              No image
            </div>
          )}
        </div>
      </Link>

      <div className="p-4">
        <Link to={`/products/${product.id}`}>
          <h2 className="font-semibold text-gray-900 hover:text-gray-600">
            {product.name}
          </h2>
        </Link>

        <p className="mt-2 text-lg font-bold text-gray-900">
          {currencySymbol}
          {price.toFixed(2)}
        </p>

        {product.is_purchasable &&
          product.is_in_stock && (
            <button
              type="button"
              onClick={handleAddToCart}
              className="mt-4 w-full rounded-lg bg-black px-4 py-3 font-semibold text-white transition hover:bg-gray-800"
            >
              Add to Cart
            </button>
          )}

        {!product.is_in_stock && (
          <p className="mt-4 text-sm font-medium text-red-600">
            Out of Stock
          </p>
        )}
      </div>
    </article>
  );
}

export default ProductCard;