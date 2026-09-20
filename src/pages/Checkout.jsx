import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import { useAuth } from "../hooks/useAuth";

function Checkout() {
  const navigate = useNavigate();

  const { user } = useAuth();

  const {
    cartItems,
    cartTotal,
    clearCart,
  } = useCart();

  const [form, setForm] = useState({
    firstName: user?.first_name || "",
    lastName: user?.last_name || "",
    email: user?.email || "",
    phone: "",
    address: "",
    city: "",
    state: "",
    postcode: "",
    country: "IN",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost/urban-supply/wp-json/urban-supply/v1/orders",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            billing: {
              first_name: form.firstName,
              last_name: form.lastName,
              email: form.email,
              phone: form.phone,
              address_1: form.address,
              city: form.city,
              state: form.state,
              postcode: form.postcode,
              country: form.country,
            },
            shipping: {
              first_name: form.firstName,
              last_name: form.lastName,
              address_1: form.address,
              city: form.city,
              state: form.state,
              postcode: form.postcode,
              country: form.country,
            },
            items: cartItems.map((item) => ({
              product_id: item.id,
              quantity: item.quantity,
            })),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Unable to create your order."
        );
      }

      clearCart();

      navigate(`/order-success/${data.id}`, {
        replace: true,
      });
    } catch (error) {
      setError(
        error.message ||
          "Unable to place your order."
      );
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <main className="min-h-screen bg-gray-50 px-4 py-12">
        <div className="mx-auto max-w-xl rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
          <h1 className="text-2xl font-bold">
            Your cart is empty
          </h1>

          <p className="mt-2 text-gray-600">
            Add products before checking out.
          </p>

          <Link
            to="/stores"
            className="mt-6 inline-block rounded-lg bg-black px-6 py-3 font-semibold text-white"
          >
            Shop Now
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-3xl font-bold text-gray-900">
          Checkout
        </h1>

        {error && (
          <div className="mt-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
          >
            <h2 className="text-xl font-bold">
              Billing Information
            </h2>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <input
                name="firstName"
                required
                value={form.firstName}
                onChange={handleChange}
                placeholder="First name"
                className="rounded-lg border border-gray-300 px-4 py-3"
              />

              <input
                name="lastName"
                required
                value={form.lastName}
                onChange={handleChange}
                placeholder="Last name"
                className="rounded-lg border border-gray-300 px-4 py-3"
              />

              <input
                name="email"
                type="email"
                required
                value={form.email}
                onChange={handleChange}
                placeholder="Email"
                className="rounded-lg border border-gray-300 px-4 py-3"
              />

              <input
                name="phone"
                type="tel"
                required
                value={form.phone}
                onChange={handleChange}
                placeholder="Phone"
                className="rounded-lg border border-gray-300 px-4 py-3"
              />

              <input
                name="address"
                required
                value={form.address}
                onChange={handleChange}
                placeholder="Address"
                className="sm:col-span-2 rounded-lg border border-gray-300 px-4 py-3"
              />

              <input
                name="city"
                required
                value={form.city}
                onChange={handleChange}
                placeholder="City"
                className="rounded-lg border border-gray-300 px-4 py-3"
              />

              <input
                name="state"
                required
                value={form.state}
                onChange={handleChange}
                placeholder="State"
                className="rounded-lg border border-gray-300 px-4 py-3"
              />

              <input
                name="postcode"
                required
                value={form.postcode}
                onChange={handleChange}
                placeholder="PIN code"
                className="rounded-lg border border-gray-300 px-4 py-3"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-8 w-full rounded-lg bg-black px-6 py-3 font-semibold text-white hover:bg-gray-800 disabled:opacity-60"
            >
              {loading
                ? "Placing Order..."
                : "Place Order"}
            </button>
          </form>

          <aside className="h-fit rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold">
              Order Summary
            </h2>

            <div className="mt-6 space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between gap-4 text-sm"
                >
                  <span>
                    {item.name} × {item.quantity}
                  </span>

                  <span>
                    ₹
                    {(
                      (Number(
                        item.prices?.price || 0
                      ) /
                        100) *
                      item.quantity
                    ).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div className="my-6 border-t border-gray-200" />

            <div className="flex justify-between text-lg font-bold">
              <span>Total</span>
              <span>₹{cartTotal.toFixed(2)}</span>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

export default Checkout;