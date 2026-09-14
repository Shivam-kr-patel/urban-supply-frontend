import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const WORDPRESS_URL = "http://localhost/urban-supply";

function Register() {
  const navigate = useNavigate();
  const { checkAuth } = useAuth();

  const [formData, setFormData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [usernameStatus, setUsernameStatus] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    if (name === "username") {
      setUsernameStatus("");
    }
  };

  const checkUsername = async () => {
    const username = formData.username.trim();

    if (!username) {
      setUsernameStatus("");
      return;
    }

    if (username.length < 3) {
      setUsernameStatus("Username must be at least 3 characters.");
      return;
    }

    try {
      const form = new URLSearchParams();
      form.append("action", "urban_supply_check_username");
      form.append("username", username);

      const response = await fetch(
        `${WORDPRESS_URL}/wp-admin/admin-ajax.php`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: form.toString(),
        }
      );
      console.log("Registration HTTP status:", response.status);
      console.log("Registration response:", await response.clone().text());
      const result = await response.json();

      if (result.success) {
        setUsernameStatus(result.data.message);
      } else {
        setUsernameStatus(
          result.data?.message || "Unable to check username."
        );
      }
    } catch (error) {
      console.error("Username check failed:", error);
      setUsernameStatus("Unable to check username.");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setMessage("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setLoading(true);

    try {
      const form = new URLSearchParams();

      form.append("action", "urban_supply_register");
      form.append("username", formData.username.trim());
      form.append("first_name", formData.firstName.trim());
      form.append("last_name", formData.lastName.trim());
      form.append("email", formData.email.trim());
      form.append("phone", formData.phone.trim());
      form.append("password", formData.password);
      form.append("confirm_password", formData.confirmPassword);

      const response = await fetch(
        `${WORDPRESS_URL}/wp-admin/admin-ajax.php`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: form.toString(),
        }
      );

      const result = await response.json();

      if (!result.success) {
        setError(
          result.data?.message ||
            "Registration failed. Please try again."
        );
        return;
      }

      setMessage(
        result.data?.message ||
          "Account created successfully."
      );

      await checkAuth();

      navigate("/account");
    } catch (error) {
      console.error("Registration failed:", error);
      setError(
        "Something went wrong. Please try again."
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
              Create Account
            </h1>

            <p className="mt-2 text-sm text-gray-600">
              Create your Urban Supply account
            </p>
          </div>

          {error && (
            <div className="mt-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          {message && (
            <div className="mt-6 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
              {message}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-5"
          >

            {/* Username */}
            <div>
              <label
                htmlFor="username"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Username
              </label>

              <input
                id="username"
                name="username"
                type="text"
                required
                minLength={3}
                autoComplete="username"
                placeholder="Choose a username"
                value={formData.username}
                onChange={handleChange}
                onBlur={checkUsername}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-black"
              />

              {usernameStatus && (
                <p
                  className={`mt-2 text-sm ${
                    usernameStatus.toLowerCase().includes("available")
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {usernameStatus}
                </p>
              )}
            </div>

            {/* First + Last Name */}
            <div className="grid gap-5 sm:grid-cols-2">

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
                  autoComplete="given-name"
                  placeholder="First name"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-black"
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
                  autoComplete="family-name"
                  placeholder="Last name"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-black"
                />
              </div>

            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Email Address
              </label>

              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-black"
              />
            </div>

            {/* Phone */}
            <div>
              <label
                htmlFor="phone"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Phone Number
              </label>

              <input
                id="phone"
                name="phone"
                type="tel"
                required
                autoComplete="tel"
                placeholder="Phone number"
                value={formData.phone}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-black"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Password
              </label>

              <input
                id="password"
                name="password"
                type="password"
                required
                minLength={8}
                autoComplete="new-password"
                placeholder="At least 8 characters"
                value={formData.password}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-black"
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>

              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                minLength={8}
                autoComplete="new-password"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-black"
              />
            </div>

            {/* Terms */}
            <label className="flex items-start gap-3 text-sm text-gray-600">
              <input
                type="checkbox"
                required
                className="mt-1 h-4 w-4 rounded border-gray-300"
              />

              <span>
                I agree to the Terms & Conditions and Privacy
                Policy.
              </span>
            </label>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-black px-6 py-3 font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading
                ? "Creating Account..."
                : "Create Account"}
            </button>

          </form>

          <div className="mt-6 border-t border-gray-200 pt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?
            </p>

            <Link
              to="/login"
              className="mt-1 inline-block text-sm font-semibold text-black hover:underline"
            >
              Login
            </Link>
          </div>

        </div>
      </div>
    </main>
  );
}

export default Register;