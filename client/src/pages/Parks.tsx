import ParkList from "../components/Parks/ParkList";
import PageHeading from "../components/common/PageHeading";

const Parks = () => {
  return (
    <section
      className="mt-10 lg:mt-15 flex flex-col mb-10 items-center 
    max-w-6xl mx-auto px-5 py-12 "
    >
      <PageHeading title="Parks" />
      <p className="font-serif leading-relaxed text-lg mb-6 text-center">
        Plan your visit. Search for a park by name, location or state.
      </p>
      <ParkList />
    </section>
  );
};

export default Parks;
