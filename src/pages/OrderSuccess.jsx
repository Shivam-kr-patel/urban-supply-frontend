import { Link, useParams } from "react-router-dom";

function OrderSuccess() {
  const { orderId } = useParams();

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-12">
      <div className="mx-auto max-w-xl rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-2xl text-green-700">
          ✓
        </div>

        <h1 className="mt-6 text-3xl font-bold text-gray-900">
          Order Placed
        </h1>

        <p className="mt-3 text-gray-600">
          Your order has been successfully created.
        </p>

        {orderId && (
          <p className="mt-4 text-sm text-gray-500">
            Order #{orderId}
          </p>
        )}

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            to="/stores"
            className="rounded-lg bg-black px-6 py-3 font-semibold text-white hover:bg-gray-800"
          >
            Continue Shopping
          </Link>

          <Link
            to="/account"
            className="rounded-lg border border-gray-300 px-6 py-3 font-semibold text-gray-900 hover:bg-gray-50"
          >
            My Account
          </Link>
        </div>
      </div>
    </main>
  );
}

export default OrderSuccess;