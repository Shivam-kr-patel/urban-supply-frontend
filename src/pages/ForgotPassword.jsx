import { useState } from "react";
import { Link } from "react-router-dom";

import { forgotPassword } from "../api/auth";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  const [message, setMessage] =
    useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setMessage("");
    setError("");
    setLoading(true);

    try {
      const data =
        await forgotPassword(email);

      setMessage(data.message);
    } catch (error) {
      setError(
        error.message ||
          "Unable to process your request."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md">
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">

          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900">
              Forgot Password?
            </h1>

            <p className="mt-2 text-sm text-gray-600">
              Enter your email and we'll send you
              a password reset link.
            </p>
          </div>

          {message && (
            <div className="mt-6 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
              {message}
            </div>
          )}

          {error && (
            <div className="mt-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-5"
          >
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email Address
              </label>

              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(event) =>
                  setEmail(event.target.value)
                }
                autoComplete="email"
                placeholder="you@example.com"
                className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-black px-6 py-3 font-semibold text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading
                ? "Sending..."
                : "Send Reset Link"}
            </button>
          </form>

          <div className="mt-6 border-t border-gray-200 pt-6 text-center">
            <Link
              to="/login"
              className="text-sm font-semibold text-gray-900 hover:underline"
            >
              Back to Login
            </Link>
          </div>

        </div>
      </div>
    </main>
  );
}

export default ForgotPassword;