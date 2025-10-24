import { Link } from "react-router-dom";

const HomeHero = () => {
  return (
    <section
      className="mt-19 grid grid-cols-1 lg:grid-cols-2 max-w-6xl mx-auto 
    rounded-3xl px-5"
    >
      <div
        className="flex flex-col justify-center items-start gap-4 md:gap-8 
      pr-5"
      >
        <h1 className="text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-serif">
          Discover National Parks in the United States
        </h1>
        <p className="text-lg font-serif ">
          Breathtaking landscapes and endless adventrues. Explore America’s
          national parks with Park Explorer — your ultimate park guide to
          nature’s greatest wonders.
        </p>
        <Link
          to="/parks"
          className="bg-[var(--color-text)] border-2 
          border-[var(--color-text)] px-6 py-3 text-white rounded-full 
          transition-all 
          duration-300 ease-in-out hover:cursor-pointer hover:bg-transparent
           hover:text-black 
          hover:border-[var(--color-primary)]"
        >
          Find a park
        </Link>
      </div>
      {/* Responsive image with webp support */}
      <div
        className="aspect-[4/3] md:aspect-[3/2] lg:aspect-[4/3] h-auto mt-6
       lg:mt-2"
      >
        <picture className="w-full h-full block">
          <source
            type="image/webp"
            srcSet="/yosemite-small.webp 640w, /yosemite-medium.webp 1024w,
             /yosemite-large.webp 1600w"
            sizes="(min-width: 1024px) 50vw, 100vw"
          />
          <img
            src="/yosemite-small.jpg"
            srcSet="/yosemite-small.jpg 640w, /yosemite-medium.jpg 1024w, 
            /yosemite-large.jpg 1600w"
            sizes="(min-width: 1024px) 50vw, 100vw"
            alt="Yosemite National Park"
            className="w-full h-full rounded-2xl object-cover"
          />
        </picture>
      </div>
    </section>
  );
};

export default HomeHero;
