import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function Account() {
  const navigate = useNavigate();

  const {
    user,
    logout,
  } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login", {
        replace: true,
      });
    } catch (error) {
      console.error(
        "Logout failed:",
        error
      );
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                My Account
              </h1>

              <p className="mt-2 text-gray-600">
                Welcome, {user?.first_name || user?.username}.
              </p>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              className="rounded-lg border border-red-200 px-5 py-2.5 font-semibold text-red-600 hover:bg-red-50"
            >
              Logout
            </button>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-gray-200 p-5">
              <h2 className="font-semibold">
                Profile
              </h2>

              <div className="mt-4 space-y-2 text-sm text-gray-600">
                <p>
                  Name:{" "}
                  <span className="text-gray-900">
                    {user?.name}
                  </span>
                </p>

                <p>
                  Username:{" "}
                  <span className="text-gray-900">
                    {user?.username}
                  </span>
                </p>

                <p>
                  Email:{" "}
                  <span className="text-gray-900">
                    {user?.email}
                  </span>
                </p>
              </div>
            </div>

            <div className="rounded-xl border border-gray-200 p-5">
              <h2 className="font-semibold">
                Shopping
              </h2>

              <div className="mt-4 space-y-3">
                <Link
                  to="/stores"
                  className="block text-sm font-medium hover:underline"
                >
                  Continue Shopping
                </Link>

                <Link
                  to="/cart"
                  className="block text-sm font-medium hover:underline"
                >
                  View Cart
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Account;