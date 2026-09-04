import { Link } from "react-router-dom";

function ProductCard({ product }) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
      <Link to={`/products/${product.id}`}>
        {product.images.length > 0 && (
          <div className="aspect-square overflow-hidden bg-gray-100">
            <img
              className="h-full w-full object-cover transition duration-300 hover:scale-105"
              src={product.images[0].src}
              alt={product.images[0].alt || product.name}
            />
          </div>
        )}

        <div className="p-5">
          <p className="mb-2 text-sm text-gray-500">
            {product.categories[0]?.name}
          </p>

          <h3 className="text-lg font-semibold text-gray-900">
            {product.name}
          </h3>

          <p className="mt-2 text-xl font-bold text-gray-900">
            ₹{(Number(product.prices.price) / 100).toFixed(2)}
          </p>
        </div>
      </Link>

      <div className="px-5 pb-5">
        <button
          type="button"
          className="w-full rounded-lg bg-black px-4 py-3 font-medium text-white transition hover:bg-gray-800 active:scale-[0.98]"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;