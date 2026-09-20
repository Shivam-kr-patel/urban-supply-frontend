import HeroSlider from "../components/HeroSlider";
import Features from "../components/Features";
import FeaturedProducts from "../components/FeaturedProducts";
import Categories from "../components/Categories";
import RecommendedProducts from "../components/RecommendedProducts";
import NewArrivals from "../components/NewArrivals";

function Home() {
  return (
    <>
      <HeroSlider />

          {/* Marquee */}
          <section className="overflow-hidden border-y border-black bg-black py-4 text-white">
          <div className="flex w-max animate-[marquee_20s_linear_infinite]">
            <div className="flex shrink-0 items-center">
              <span className="mx-8 text-sm font-medium uppercase tracking-[0.2em]">
                Free Shipping
              </span>

              <span className="text-lg">•</span>

              <span className="mx-8 text-sm font-medium uppercase tracking-[0.2em]">
                New Arrivals
              </span>

              <span className="text-lg">•</span>

              <span className="mx-8 text-sm font-medium uppercase tracking-[0.2em]">
                Special Offers
              </span>

              <span className="text-lg">•</span>

              <span className="mx-8 text-sm font-medium uppercase tracking-[0.2em]">
                Premium Quality
              </span>

              <span className="text-lg">•</span>
            </div>

            <div className="flex shrink-0 items-center">
              <span className="mx-8 text-sm font-medium uppercase tracking-[0.2em]">
                Free Shipping
              </span>

              <span className="text-lg">•</span>

              <span className="mx-8 text-sm font-medium uppercase tracking-[0.2em]">
                New Arrivals
              </span>

              <span className="text-lg">•</span>

              <span className="mx-8 text-sm font-medium uppercase tracking-[0.2em]">
                Special Offers
              </span>

              <span className="text-lg">•</span>

              <span className="mx-8 text-sm font-medium uppercase tracking-[0.2em]">
                Premium Quality
              </span>

              <span className="text-lg">•</span>
            </div>
          </div>
          </section>

          <Features />

          <FeaturedProducts />

          {/* Discover Style */}
<section className="py-16 sm:py-20 lg:py-24">
  <div className="site-container">
    <div className="grid items-center gap-10 md:grid-cols-2 lg:gap-16 sm:py-10 lg:py-16">

      {/* Content */}
      <div>
        <p className="mb-3 text-sm uppercase tracking-[0.25em]">
          Urban Supply
        </p>

        <h2 className="max-w-xl text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
          Discover Your Style
        </h2>

        <p className="mt-5 max-w-md text-base text-gray-600 sm:text-lg">
          Premium clothing designed for modern everyday living.
        </p>

        <h3 className="mt-8 text-lg font-semibold">
          New Collection →
        </h3>
      </div>

      {/* Image */}
      <div className="overflow-hidden">
        <img
          src={`${import.meta.env.VITE_WP_URL}/wp-content/uploads/2026/09/slider-images5.webp`}
          alt="Urban Supply new collection"
          className="h-[250px] w-full object-cover sm:h-[250px] lg:h-[550px] rounded-lg"
        />
      </div>

    </div>
  </div>
</section>
<Categories />
<RecommendedProducts />
<NewArrivals />
    </>
  );
}

export default Home;
