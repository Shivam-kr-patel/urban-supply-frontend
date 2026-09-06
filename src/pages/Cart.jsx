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

  const currencySymbol =
    cartItems[0]?.prices?.currency_symbol || "₹";

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex items-center justify-between gap-4">
          <h1 className="text-3xl font-bold text-gray-900">
            Your Cart
          </h1>

          <button
            type="button"
            onClick={clearCart}
            className="text-sm font-medium text-red-600 transition hover:text-red-700"
          >
            Clear Cart
          </button>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="space-y-4 lg:col-span-2">
            {cartItems.map((item) => {
              const price =
                Number(item.prices?.price || 0) / 100;

              const maximumQuantity =
                item.add_to_cart?.maximum || 999;

              const itemSubtotal =
                price * item.quantity;

              return (
                <div
                  key={item.id}
                  className="flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:flex-row"
                >
                  <div className="h-32 w-full shrink-0 overflow-hidden rounded-lg bg-gray-100 sm:h-28 sm:w-28">
                    {item.images?.length > 0 ? (
                      <img
                        src={item.images[0].src}
                        alt={
                          item.images[0].alt ||
                          item.name
                        }
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-sm text-gray-400">
                        No image
                      </div>
                    )}
                  </div>

                  <div className="flex flex-1 flex-col">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h2 className="font-semibold text-gray-900">
                          {item.name}
                        </h2>

                        <p className="mt-1 text-sm text-gray-600">
                          {currencySymbol}
                          {price.toFixed(2)}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          removeFromCart(item.id)
                        }
                        className="text-sm font-medium text-red-600 transition hover:text-red-700"
                      >
                        Remove
                      </button>
                    </div>

                    <div className="mt-6 flex items-center justify-between gap-4">
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
                          className="px-3 py-2 text-lg text-gray-600 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
                          aria-label={`Decrease quantity of ${item.name}`}
                        >
                          −
                        </button>

                        <span className="min-w-10 text-center font-medium text-gray-900">
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
                          disabled={
                            item.quantity >=
                            maximumQuantity
                          }
                          className="px-3 py-2 text-lg text-gray-600 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
                          aria-label={`Increase quantity of ${item.name}`}
                        >
                          +
                        </button>
                      </div>

                      <p className="font-semibold text-gray-900">
                        {currencySymbol}
                        {itemSubtotal.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <aside className="h-fit rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900">
              Order Summary
            </h2>

            <div className="mt-6 flex justify-between border-b border-gray-200 pb-4">
              <span className="text-gray-600">
                Subtotal
              </span>

              <span className="font-medium text-gray-900">
                {currencySymbol}
                {cartTotal.toFixed(2)}
              </span>
            </div>

            <div className="mt-4 flex justify-between">
              <span className="text-lg font-bold text-gray-900">
                Total
              </span>

              <span className="text-lg font-bold text-gray-900">
                {currencySymbol}
                {cartTotal.toFixed(2)}
              </span>
            </div>

            <Link
              to="/checkout"
              className="mt-6 block w-full rounded-lg bg-black px-6 py-3 text-center font-semibold text-white transition hover:bg-gray-800"
            >
              Proceed to Checkout
            </Link>

            <Link
              to="/stores"
              className="mt-4 block text-center text-sm font-medium text-gray-600 transition hover:text-black"
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