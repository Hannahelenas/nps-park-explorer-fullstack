import PageHeading from "../components/common/PageHeading";
import { useAuth } from "../context/auth/useAuth";

const UserPage = () => {
  const { user } = useAuth();
  return (
    <section
      className="mt-10 lg:mt-15 flex flex-col mb-10 items-center 
    max-w-6xl mx-auto px-5 py-12 "
    >
      <PageHeading title="Profile" />
      <p className="font-serif leading-relaxed text-lg mb-6 text-center py-12">
        Welcome user! Welcome {user?.email}
      </p>
      <button onClick={() => {}}>Update profile</button>
    </section>
  );
};

export default UserPage;
