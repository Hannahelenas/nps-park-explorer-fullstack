import { useThingsToDo } from "../../hooks/useThingsToDo";

interface ThingsToDoSectionProps {
  parkCode: string;
}

const ThingsToDoSection = ({ parkCode }: ThingsToDoSectionProps) => {
  const { thingsToDo, isLoading, error } = useThingsToDo(parkCode);

  if (isLoading) return <p>Loading things to do ...</p>;
  if (error) return <p>Something went wrong: {error.message}</p>;
  if (!thingsToDo || thingsToDo.length === 0) return null;

  return (
    <div className="bg-[var(--color-secondary)]">
      <section className="max-w-6xl px-5 md:px-10 xl:px-5 mx-auto py-12 ">
        <h2
          className="text-2xl md:text-4xl font-black tracking-tighter mb-6
      "
        >
          Things to do
        </h2>
        <div className="flex gap-4 overflow-x-auto flex-nowrap pb-4 ">
          {thingsToDo &&
            thingsToDo.length > 0 &&
            thingsToDo.slice(0, 7).map((thing) => (
              <div
                className="mb-2 min-w-[300px] max-w-[300px] flex-shrink-0 
                hover:bg-[var(--color-teritary)] p-2 rounded-3xl  
                hover:cursor-pointer hover:underline"
                key={thing.id}
              >
                {thing.images.length > 0 && (
                  <img
                    src={thing.images[0].url}
                    alt={thing.images[0].altText || thing.title}
                    loading="lazy"
                    className="aspect-[3/2] sm:w-full  lg:w-full 
                  object-cover rounded-2xl"
                  />
                )}
                <h3 className="text-xl font-black mt-2">{thing.title}</h3>
                <p className="font-bold font-serif mt-2">
                  {thing.activities.map((a) => a.name)}
                </p>
              </div>
            ))}
        </div>
        {/* TODO finish all activities display */}
        {thingsToDo.length > 7 && <div className="mt-4 flex"></div>}
        <a
          /*  href={`TODO Fix routing setup`} */
          className="flex justify-end font-bold font-serif 
              hover:underline underline-offset-2"
        >
          View all acitvites
        </a>
      </section>
    </div>
  );
};

export default ThingsToDoSection;
