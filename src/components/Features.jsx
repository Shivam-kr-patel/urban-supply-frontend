const features = [
  {
    icon: "truck",
    title: "Free Shipping",
    description: "Free shipping on orders over ₹999.",
  },
  {
    icon: "shield",
    title: "Secure Payment",
    description: "Safe and secure payment every time.",
  },
  {
    icon: "refresh",
    title: "Easy Returns",
    description: "Simple returns within 7 days.",
  },
  {
    icon: "support",
    title: "Customer Support",
    description: "We're here whenever you need us.",
  },
];

function Features() {
  return (
    <section className="border-b border-gray-200 bg-white">
      <div className="mx-auto grid max-w-7xl grid-cols-1 divide-y divide-gray-200 sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="flex items-start gap-4 px-6 py-10 lg:px-8"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gray-200">
              {feature.icon === "truck" && (
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 17h8m-8 0a2 2 0 1 1-4 0m4 0a2 2 0 1 0 4 0m8 0a2 2 0 1 1-4 0m4 0a2 2 0 1 0 4 0M3 17V6a1 1 0 0 1 1-1h11a1 1 0 0 1 1 1v11M16 8h3l3 4v5h-2"
                  />
                </svg>
              )}

              {feature.icon === "shield" && (
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3z"
                  />
                </svg>
              )}

              {feature.icon === "refresh" && (
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 4v5h5M20 20v-5h-5M5 9a7 7 0 0 1 12-3l3 3M19 15a7 7 0 0 1-12 3l-3-3"
                  />
                </svg>
              )}

              {feature.icon === "support" && (
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M18 10a6 6 0 0 0-12 0v5a2 2 0 0 0 2 2h2v-5H6m12 0h-4v5h2a2 2 0 0 0 2-2v-5z"
                  />
                </svg>
              )}
            </div>

            <div>
              <h3 className="text-sm font-semibold">
                {feature.title}
              </h3>

              <p className="mt-1 text-sm leading-6 text-gray-500">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Features;