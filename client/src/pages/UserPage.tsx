import PageHeading from "../components/common/PageHeading";

const UserPage = () => {
  return (
    <section
      className="mt-10 lg:mt-15 flex flex-col mb-10 items-center 
    max-w-6xl mx-auto px-5 py-12 "
    >
      <PageHeading title="Profile" />
      <p className="font-serif leading-relaxed text-lg mb-6 text-center py-10">
        Welcome user!
      </p>
    </section>
  );
};

export default UserPage;
