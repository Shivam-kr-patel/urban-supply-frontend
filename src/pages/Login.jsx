import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const WORDPRESS_URL = "http://localhost/urban-supply";

function Login() {
  const navigate = useNavigate();
  const { checkAuth } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const googleLoginUrl =
    "http://localhost/urban-supply/wp-login.php?loginSocial=google";

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setSubmitting(true);

    try {
      const body = new URLSearchParams();

      body.append("action", "urban_supply_login");
      body.append("email", form.email.trim());
      body.append("password", form.password);

      const response = await fetch(
        `${WORDPRESS_URL}/wp-admin/admin-ajax.php`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type":
              "application/x-www-form-urlencoded",
          },
          body: body.toString(),
        }
      );

      const result = await response.json();

      if (!result.success) {
        setError(
          result.data?.message ||
            "Invalid email or password."
        );
        return;
      }

      await checkAuth();

      navigate("/account", {
        replace: true,
      });
    } catch (requestError) {
      console.error(
        "Login failed:",
        requestError
      );

      setError(
        "Unable to sign in. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md">
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">

          <div className="text-center">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Welcome Back
            </h1>

            <p className="mt-2 text-sm text-gray-600">
              Sign in to your Urban Supply account
            </p>
          </div>

          {error && (
            <div className="mt-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <div className="mt-8">
            <a
              href={googleLoginUrl}
              className="flex w-full items-center justify-center gap-3 rounded-lg border border-gray-300 bg-white px-4 py-3 font-semibold text-gray-900 transition hover:bg-gray-50"
            >
              <span className="text-lg font-bold">
                G
              </span>

              <span>
                Continue with Google
              </span>
            </a>
          </div>

          <div className="my-6 flex items-center gap-4">
            <div className="h-px flex-1 bg-gray-200" />

            <span className="text-sm text-gray-500">
              OR
            </span>

            <div className="h-px flex-1 bg-gray-200" />
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>

              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={form.email}
                onChange={handleChange}
                className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-black"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>

                <button
                  type="button"
                  className="text-sm font-medium text-gray-600 hover:text-black"
                  onClick={() => {
                    console.log(
                      "Forgot password clicked"
                    );
                  }}
                >
                  Forgot Password?
                </button>
              </div>

              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={form.password}
                onChange={handleChange}
                className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-black"
                placeholder="Enter your password"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-lg bg-black px-6 py-3 font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {submitting
                ? "Signing In..."
                : "Sign In"}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-semibold text-gray-900 hover:underline"
            >
              Sign Up
            </Link>
          </p>

        </div>
      </div>
    </main>
  );
}

export default Login;