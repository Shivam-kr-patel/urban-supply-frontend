import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Account() {
  const { user, loading, isLoggedIn, logout } = useAuth();

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-gray-600">
            Loading account...
          </p>
        </div>
      </main>
    );
  }

  if (!isLoggedIn) {
    return (
      <main className="min-h-screen bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-md rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
          <h1 className="text-3xl font-bold text-gray-900">
            Sign In Required
          </h1>

          <p className="mt-3 text-gray-600">
            Please sign in to view your account.
          </p>

          <Link
            to="/login"
            className="mt-6 inline-block rounded-lg bg-black px-6 py-3 font-semibold text-white transition hover:bg-gray-800"
          >
            Sign In
          </Link>
        </div>
      </main>
    );
  }

  const fullName =
    user.name ||
    `${user.first_name || ""} ${user.last_name || ""}`.trim() ||
    user.username;

  const role =
    user.roles?.length > 0
      ? user.roles[0]
      : "customer";

  const formattedRole =
    role.charAt(0).toUpperCase() +
    role.slice(1).replace(/-/g, " ");

  const handleLogout = async () => {
    await logout();
  };

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="border-b border-gray-200 p-8">
            <h1 className="text-3xl font-bold text-gray-900">
              My Account
            </h1>

            <p className="mt-2 text-gray-600">
              Manage your Urban Supply account.
            </p>
          </div>

          <div className="p-8">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
              <img
                src={user.avatar}
                alt={fullName}
                className="h-24 w-24 rounded-full border border-gray-200 object-cover"
              />

              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {fullName}
                </h2>

                <p className="mt-1 text-gray-600">
                  {user.email}
                </p>

                <p className="mt-2 text-sm font-medium text-gray-500">
                  Account type: {formattedRole}
                </p>
              </div>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-gray-200 p-5">
                <p className="text-sm text-gray-500">
                  Username
                </p>

                <p className="mt-1 font-semibold text-gray-900">
                  {user.username}
                </p>
              </div>

              <div className="rounded-xl border border-gray-200 p-5">
                <p className="text-sm text-gray-500">
                  Email
                </p>

                <p className="mt-1 font-semibold text-gray-900">
                  {user.email}
                </p>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/stores"
                className="rounded-lg bg-black px-6 py-3 font-semibold text-white transition hover:bg-gray-800"
              >
                Continue Shopping
              </Link>

              <button
                type="button"
                onClick={handleLogout}
                className="rounded-lg border border-gray-300 px-6 py-3 font-semibold text-gray-900 transition hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Account;