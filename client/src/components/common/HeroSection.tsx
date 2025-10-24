import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <>
      <section
        className="relative w-full h-[50dvh] lg:h-[68dvh] 
      lg:max-h-[900px]"
      >
        <picture className="w-full h-full block">
          <source
            type="image/webp"
            srcSet="/yosemite-small.webp 640w, /yosemite-medium.webp 1024w,
                  /yosemite-large.webp 1600w"
            sizes="100vw"
          />
          <img
            src="/yosemite-small.jpg"
            srcSet="/yosemite-small.jpg 640w, /yosemite-medium.jpg 1024w, 
                /yosemite-large.jpg 1600w"
            sizes="100vw"
            alt="Yosemite National Park"
            className="w-full h-full object-cover"
          />
        </picture>

        {/* SVG wave*/}
        <svg
          aria-hidden="true"
          className="absolute bottom-0 left-0 w-full h-[60px] z-30"
          viewBox="0 0 1000 150"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="#f0f7ea"
            d="M0,75 C250,0 750,150 1000,75 V150 H0 Z"
          ></path>
        </svg>
      </section>

      {/* Text container */}
      <section className="bg-[var(--color-secondary)]">
        <div
          className="flex flex-col justify-center items-start gap-4 md:gap-4
          py-0 mx-auto max-w-6xl px-5 sm:px-6  md:px-10 lg:px-10 xl:px-0"
        >
          <h1
            className="text-4xl md:text-5xl lg:text-5xl xl:text-6xl 
          font-serif"
          >
            Discover National Parks
          </h1>
          <p className="text-lg font-serif lg:w-[80%] xl:w-[65%] mb-2 ">
            Breathtaking landscapes and endless adventrues. Explore America’s
            national parks with Park Explorer — your ultimate park guide to
            nature’s greatest wonders.
          </p>
          <div className="flex flex-row gap-4 pb-8">
            <Link
              to="/parks"
              className="bg-[var(--color-primary)] border-2 
            border-[var(--color-primary)] px-6 py-3 text-white rounded-full 
            transition-all 
            duration-300 ease-in-out hover:cursor-pointer hover:bg-transparent
            hover:text-black 
            hover:border-[var(--color-primary)]"
            >
              Find a park
            </Link>
            <a
              href="#activities-section"
              className="bg-[var(--color-secondary)] border-2 
            border-[var(--color-text)] px-6 py-3 text-black rounded-full 
            transition-all 
            duration-300 ease-in-out hover:cursor-pointer hover:bg-transparent
            hover:text-black 
            hover:border-[var(--color-primary)]"
            >
              Explore activities
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
