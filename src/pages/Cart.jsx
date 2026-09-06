import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Cart() {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartTotal,
  } = useCart();

  // Empty cart
  if (cartItems.length === 0) {
    return (
      <main className="min-h-screen bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Your Cart
          </h1>

          <p className="mt-4 text-gray-600">
            Your cart is currently empty.
          </p>

          <Link
            to="/stores"
            className="mt-6 inline-block rounded-lg bg-black px-6 py-3 font-semibold text-white hover:bg-gray-800"
          >
            Continue Shopping
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">
            Your Cart
          </h1>

          <button
            type="button"
            onClick={clearCart}
            className="text-sm font-medium text-red-600 hover:text-red-700"
          >
            Clear Cart
          </button>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">

          {/* Cart Items */}
          <div className="space-y-4 lg:col-span-2">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm"
              >

                {/* Image */}
                <div className="h-28 w-28 shrink-0 overflow-hidden rounded-lg bg-gray-100">
                  {item.images?.length > 0 ? (
                    <img
                      src={item.images[0].src}
                      alt={item.images[0].alt || item.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-xs text-gray-400">
                      No image
                    </div>
                  )}
                </div>

                {/* Product information */}
                <div className="flex flex-1 flex-col">

                  <div className="flex justify-between gap-4">
                    <h2 className="font-semibold text-gray-900">
                      {item.name}
                    </h2>

                    <button
                      type="button"
                      onClick={() => removeFromCart(item.id)}
                      className="text-sm text-red-600 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </div>

                  {/* Price */}
                  <p className="mt-1 text-sm text-gray-600">
                    {item.prices.currency_symbol}
                    {(Number(item.prices.price) / 100).toFixed(2)}
                  </p>

                  {/* Quantity */}
                  <div className="mt-auto flex items-center gap-3 pt-4">

                    <div className="flex items-center rounded-lg border border-gray-300">

                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(
                            item.id,
                            item.quantity - 1
                          )
                        }
                        disabled={item.quantity <= 1}
                        className="px-3 py-2 text-gray-600 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        −
                      </button>

                      <span className="min-w-10 text-center font-medium">
                        {item.quantity}
                      </span>

                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(
                            item.id,
                            item.quantity + 1
                          )
                        }
                        className="px-3 py-2 text-gray-600 hover:bg-gray-100"
                      >
                        +
                      </button>

                    </div>

                    {/* Item subtotal */}
                    <p className="ml-auto font-semibold text-gray-900">
                      {item.prices.currency_symbol}
                      {(
                        (Number(item.prices.price) / 100) *
                        item.quantity
                      ).toFixed(2)}
                    </p>

                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <aside className="h-fit rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

            <h2 className="text-xl font-bold text-gray-900">
              Order Summary
            </h2>

            <div className="mt-6 flex justify-between border-b border-gray-200 pb-4">
              <span className="text-gray-600">
                Subtotal
              </span>

              <span className="font-medium text-gray-900">
                {cartItems[0].prices.currency_symbol}
                {cartTotal.toFixed(2)}
              </span>
            </div>

            <div className="mt-4 flex justify-between">
              <span className="text-lg font-bold text-gray-900">
                Total
              </span>

              <span className="text-lg font-bold text-gray-900">
                {cartItems[0].prices.currency_symbol}
                {cartTotal.toFixed(2)}
              </span>
            </div>

            <button
              type="button"
              className="mt-6 w-full rounded-lg bg-black px-6 py-3 font-semibold text-white hover:bg-gray-800"
            >
              Proceed to Checkout
            </button>

            <Link
              to="/stores"
              className="mt-4 block text-center text-sm font-medium text-gray-600 hover:text-black"
            >
              Continue Shopping
            </Link>

          </aside>

        </div>
      </div>
    </main>
  );
}

export default Cart;