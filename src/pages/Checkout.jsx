import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Checkout() {
  const { cartItems, cartTotal } = useCart();

  if (cartItems.length === 0) {
    return (
      <main className="min-h-screen bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Checkout
          </h1>

          <p className="mt-4 text-gray-600">
            Your cart is empty.
          </p>

          <Link
            to="/stores"
            className="mt-6 inline-block rounded-lg bg-black px-6 py-3 font-semibold text-white transition hover:bg-gray-800"
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
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Checkout
          </h1>

          <p className="mt-2 text-gray-600">
            Enter your details to complete your order.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Checkout Form */}
          <section className="lg:col-span-2">
            <form className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-xl font-bold text-gray-900">
                Billing Details
              </h2>

              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="firstName"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    First Name
                  </label>

                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    required
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-black"
                    placeholder="First name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="lastName"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Last Name
                  </label>

                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    required
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-black"
                    placeholder="Last name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-black"
                    placeholder="you@example.com"
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Phone
                  </label>

                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-black"
                    placeholder="Phone number"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="address"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Address
                  </label>

                  <input
                    id="address"
                    name="address"
                    type="text"
                    required
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-black"
                    placeholder="Street address"
                  />
                </div>

                <div>
                  <label
                    htmlFor="city"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    City
                  </label>

                  <input
                    id="city"
                    name="city"
                    type="text"
                    required
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-black"
                    placeholder="City"
                  />
                </div>

                <div>
                  <label
                    htmlFor="state"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    State
                  </label>

                  <input
                    id="state"
                    name="state"
                    type="text"
                    required
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-black"
                    placeholder="State"
                  />
                </div>

                <div>
                  <label
                    htmlFor="postcode"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    PIN Code
                  </label>

                  <input
                    id="postcode"
                    name="postcode"
                    type="text"
                    required
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-black"
                    placeholder="PIN code"
                  />
                </div>

                <div>
                  <label
                    htmlFor="country"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Country
                  </label>

                  <input
                    id="country"
                    name="country"
                    type="text"
                    value="India"
                    readOnly
                    className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-gray-600 outline-none"
                  />
                </div>
              </div>

              <div className="mt-8 border-t border-gray-200 pt-6">
                <h2 className="text-xl font-bold text-gray-900">
                  Payment
                </h2>

                <div className="mt-4 rounded-lg border border-gray-200 bg-gray-50 p-4">
                  <p className="font-medium text-gray-900">
                    Payment integration coming next
                  </p>

                  <p className="mt-1 text-sm text-gray-600">
                    WooCommerce payment processing will be connected
                    after the checkout form is complete.
                  </p>
                </div>
              </div>

              <button
                type="button"
                disabled
                className="mt-8 w-full cursor-not-allowed rounded-lg bg-gray-300 px-6 py-3 font-semibold text-gray-500"
              >
                Place Order — Coming Soon
              </button>
            </form>
          </section>

          {/* Order Summary */}
          <aside className="h-fit rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900">
              Order Summary
            </h2>

            <div className="mt-6 space-y-5">
              {cartItems.map((item) => {
                const price =
                  Number(item.prices?.price || 0) / 100;

                const itemSubtotal =
                  price * item.quantity;

                return (
                  <div
                    key={item.id}
                    className="flex gap-4"
                  >
                    <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-gray-100">
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
                        <div className="flex h-full items-center justify-center text-xs text-gray-400">
                          No image
                        </div>
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3 className="truncate font-medium text-gray-900">
                        {item.name}
                      </h3>

                      <p className="mt-1 text-sm text-gray-500">
                        Qty: {item.quantity}
                      </p>
                    </div>

                    <p className="font-medium text-gray-900">
                      {currencySymbol}
                      {itemSubtotal.toFixed(2)}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 border-t border-gray-200 pt-4">
              <div className="flex justify-between">
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
            </div>

            <Link
              to="/cart"
              className="mt-6 block text-center text-sm font-medium text-gray-600 transition hover:text-black"
            >
              ← Back to Cart
            </Link>
          </aside>
        </div>
      </div>
    </main>
  );
}

export default Checkout;