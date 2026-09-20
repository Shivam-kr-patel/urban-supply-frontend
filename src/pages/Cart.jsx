import { Link } from "react-router-dom";
import { useCart } from "../hooks/useCart";

function Cart() {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartCount,
    cartTotal,
  } = useCart();

  if (cartItems.length === 0) {
    return (
      <main className="min-h-screen bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
            <h1 className="text-3xl font-bold text-gray-900">
              Your Cart
            </h1>

            <p className="mt-3 text-gray-600">
              Your cart is currently empty.
            </p>

            <Link
              to="/shop"
              className="mt-6 inline-block rounded-lg bg-black px-6 py-3 font-semibold text-white hover:bg-gray-800"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Your Cart
            </h1>

            <p className="mt-1 text-sm text-gray-600">
              {cartCount}{" "}
              {cartCount === 1 ? "item" : "items"}
            </p>
          </div>

          <button
            type="button"
            onClick={clearCart}
            className="text-sm font-medium text-red-600 hover:underline"
          >
            Clear Cart
          </button>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
          <section className="space-y-4">
            {cartItems.map((item) => {
              const price =
                Number(item.prices?.price || 0) / 100;

              return (
                <article
                  key={item.id}
                  className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6"
                >
                  <div className="flex gap-4">
                    <img
                      src={
                        item.images?.[0]?.src ||
                        "https://via.placeholder.com/160"
                      }
                      alt={
                        item.images?.[0]?.alt ||
                        item.name
                      }
                      className="h-24 w-24 rounded-lg object-cover sm:h-32 sm:w-32"
                    />

                    <div className="min-w-0 flex-1">
                      <h2 className="font-semibold text-gray-900">
                        {item.name}
                      </h2>

                      <p className="mt-1 text-sm text-gray-600">
                        ₹{price.toFixed(2)}
                      </p>

                      <div className="mt-4 flex flex-wrap items-center gap-3">
                        <div className="flex items-center rounded-lg border border-gray-300">
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(
                                item.id,
                                item.quantity - 1
                              )
                            }
                            className="px-3 py-2 text-lg"
                          >
                            −
                          </button>

                          <span className="min-w-10 text-center text-sm font-medium">
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
                            className="px-3 py-2 text-lg"
                          >
                            +
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() =>
                            removeFromCart(item.id)
                          }
                          className="text-sm font-medium text-red-600 hover:underline"
                        >
                          Remove
                        </button>
                      </div>
                    </div>

                    <div className="text-right font-semibold text-gray-900">
                      ₹
                      {(price * item.quantity).toFixed(
                        2
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </section>

          <aside className="h-fit rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900">
              Order Summary
            </h2>

            <div className="mt-6 space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">
                  Subtotal
                </span>

                <span className="font-medium">
                  ₹{cartTotal.toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">
                  Shipping
                </span>

                <span className="font-medium">
                  Calculated at checkout
                </span>
              </div>
            </div>

            <div className="my-6 border-t border-gray-200" />

            <div className="flex justify-between text-lg font-bold">
              <span>Total</span>

              <span>
                ₹{cartTotal.toFixed(2)}
              </span>
            </div>

            <Link
              to="/checkout"
              className="mt-6 block w-full rounded-lg bg-black px-6 py-3 text-center font-semibold text-white hover:bg-gray-800"
            >
              Proceed to Checkout
            </Link>

            <Link
              to="/stores"
              className="mt-3 block text-center text-sm font-medium text-gray-600 hover:text-black"
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