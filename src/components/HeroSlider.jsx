import { useEffect, useState } from "react";

const WP_URL = import.meta.env.VITE_WP_URL;

const slides = [
  {
    image: `${WP_URL}/wp-content/uploads/2026/09/slider-images1.webp`,
    title: "Style That Moves With You",
    description: "Discover everyday essentials built for modern living.",
  },
  {
    image: `${WP_URL}/wp-content/uploads/2026/09/slider-images2.webp`,
    title: "New Season. New Energy.",
    description: "Explore fresh styles made for every occasion.",
  },
  {
    image: `${WP_URL}/wp-content/uploads/2026/09/slider-images3.webp`,
    title: "Made For Everyday",
    description: "Quality pieces designed for your lifestyle.",
  },
  {
    image: `${WP_URL}/wp-content/uploads/2026/09/slider-images4.webp`,
    title: "Find Your Style",
    description: "Simple, versatile and ready for whatever comes next.",
  },
  {
    image: `${WP_URL}/wp-content/uploads/2026/09/slider-images5.webp`,
    title: "Everyday Essentials",
    description: "Everything you need, all in one place.",
  },
  {
    image: `${WP_URL}/wp-content/uploads/2026/09/slider-images6.webp`,
    title: "Designed To Stand Out",
    description: "Bring something different to your everyday wardrobe.",
  },
  {
    image: `${WP_URL}/wp-content/uploads/2026/09/slider-images7.webp`,
    title: "Your Style. Your Way.",
    description: "Shop the latest collection from Urban Supply.",
  },
];

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? slides.length - 1 : prev - 1
    );
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-[300px] w-full overflow-hidden md:min-h-[750px] lg:min-h-[900px]">
  {/* Slides */}
  <div
    className="flex h-[300px] transition-transform duration-700 ease-in-out md:h-[750px] lg:h-[900px]"
    style={{
      transform: `translateX(-${currentSlide * 100}%)`,
    }}
  >
    {slides.map((slide, index) => (
      <div
        key={index}
        className="relative h-full min-w-full shrink-0"
      >
        <img
          src={slide.image}
          alt={slide.title}
          className="absolute inset-0 h-full w-full object-cover object-[center_top]"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/30" />

        {/* Content */}
        <div className="relative z-10 flex h-full items-center px-4 sm:px-6 md:px-12 lg:px-20">
          <div className="max-w-xl text-white">
            <p className="mb-2 text-xs uppercase tracking-[0.2em] sm:mb-3 sm:text-sm sm:tracking-[0.3em]">
              Urban Supply
            </p>

            <h1 className="text-2xl font-bold leading-tight sm:text-4xl md:text-6xl">
              {slide.title}
            </h1>

            <p className="mt-3 text-sm sm:mt-5 sm:text-base md:text-lg">
              {slide.description}
            </p>
          </div>
        </div>
      </div>
    ))}
  </div>

  {/* Previous */}
  {/* <button
    type="button"
    onClick={prevSlide}
    aria-label="Previous slide"
    className="absolute left-3 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/30 text-2xl text-white backdrop-blur-sm transition hover:bg-black/50 sm:left-5 sm:h-11 sm:w-11 sm:text-3xl"
  >
    ‹
  </button> */}

  {/* Next */}
  {/* <button
    type="button"
    onClick={nextSlide}
    aria-label="Next slide"
    className="absolute right-3 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/30 text-2xl text-white backdrop-blur-sm transition hover:bg-black/50 sm:right-5 sm:h-11 sm:w-11 sm:text-3xl"
  >
    ›
  </button> */}

  {/* Dots */}
  <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 gap-2 sm:bottom-8">
    {slides.map((_, index) => (
      <button
        key={index}
        type="button"
        onClick={() => setCurrentSlide(index)}
        aria-label={`Go to slide ${index + 1}`}
        className={`h-2 rounded-full transition-all duration-300 ${
          currentSlide === index
            ? "w-6 bg-white sm:w-8"
            : "w-2 bg-white/50"
        }`}
      />
    ))}
  </div>
</section>
  );
}