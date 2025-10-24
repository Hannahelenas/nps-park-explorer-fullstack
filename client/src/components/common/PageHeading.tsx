interface PageHeadingProps {
  title: string;
}

const PageHeading = ({ title }: PageHeadingProps) => {
  return (
    <h1
      className="text-4xl sm:text-6xl md:text-6xl font-serif text-center
     pt-10 mb-10"
    >
      {title}
    </h1>
  );
};

export default PageHeading;
