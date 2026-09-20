import { useState } from "react";
import {
  Link,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

import { resetPassword } from "../api/auth";

function ResetPassword() {
  const [searchParams] =
    useSearchParams();

  const navigate = useNavigate();

  const key =
    searchParams.get("key") || "";

  const login =
    searchParams.get("login") || "";

  const [password, setPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");

    if (!key || !login) {
      setError(
        "This password reset link is invalid or incomplete."
      );
      return;
    }

    if (password.length < 8) {
      setError(
        "Password must be at least 8 characters."
      );
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      await resetPassword(
        key,
        login,
        password,
        confirmPassword
      );

      navigate("/login", {
        replace: true,
        state: {
          message:
            "Password reset successfully. You can now sign in.",
        },
      });
    } catch (error) {
      setError(
        error.message ||
          "Unable to reset your password."
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
              Reset Password
            </h1>

            <p className="mt-2 text-sm text-gray-600">
              Enter your new password below.
            </p>
          </div>

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
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                New Password
              </label>

              <input
                id="password"
                type="password"
                required
                minLength={8}
                value={password}
                onChange={(event) =>
                  setPassword(event.target.value)
                }
                autoComplete="new-password"
                placeholder="At least 8 characters"
                className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black"
              />
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm New Password
              </label>

              <input
                id="confirmPassword"
                type="password"
                required
                minLength={8}
                value={confirmPassword}
                onChange={(event) =>
                  setConfirmPassword(event.target.value)
                }
                autoComplete="new-password"
                placeholder="Confirm your password"
                className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-black px-6 py-3 font-semibold text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading
                ? "Resetting..."
                : "Reset Password"}
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

export default ResetPassword;