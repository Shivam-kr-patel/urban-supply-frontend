function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <h2 className="text-lg font-bold text-gray-900">
              Urban Supply
            </h2>

            <p className="mt-3 max-w-xs text-sm leading-6 text-gray-600">
              Your modern destination for quality products and everyday
              essentials.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900">
              Shop
            </h3>

            <div className="mt-4 space-y-3">
              <a
                href="/stores"
                className="block text-sm text-gray-600 hover:text-gray-900"
              >
                All Products
              </a>

              <a
                href="/stores"
                className="block text-sm text-gray-600 hover:text-gray-900"
              >
                Categories
              </a>

              <a
                href="/cart"
                className="block text-sm text-gray-600 hover:text-gray-900"
              >
                Cart
              </a>
            </div>
          </div>

          {/* Account */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900">
              Account
            </h3>

            <div className="mt-4 space-y-3">
              <a
                href="/login"
                className="block text-sm text-gray-600 hover:text-gray-900"
              >
                Login
              </a>

              <a
                href="/register"
                className="block text-sm text-gray-600 hover:text-gray-900"
              >
                Register
              </a>

              <a
                href="/account"
                className="block text-sm text-gray-600 hover:text-gray-900"
              >
                My Account
              </a>
            </div>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900">
              Support
            </h3>

            <div className="mt-4 space-y-3 text-sm text-gray-600">
              <p>Contact Us</p>
              <p>Shipping & Returns</p>
              <p>Privacy Policy</p>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-gray-200 pt-6">
          <p className="text-center text-sm text-gray-500">
            © {new Date().getFullYear()} Urban Supply. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;