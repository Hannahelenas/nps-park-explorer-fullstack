import PageHeading from "../components/common/PageHeading";
import DeleteAccountForm from "../components/DeleteAccountForm";
import UpdatePasswordForm from "../components/UpdatePasswordForm";
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
      <h2 className="text-3xl lg:text-4xl ">Change Profile</h2>
      <UpdatePasswordForm />
      <DeleteAccountForm />
    </section>
  );
};

export default UserPage;
