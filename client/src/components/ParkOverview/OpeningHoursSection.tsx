import { MdOpenInNew } from "react-icons/md";
import { weekdayOrder, type Park } from "../../types/Park";
import { CiCircleChevDown } from "react-icons/ci";

interface OpeningHoursSectionProps {
  park: Park;
}

const OpeningHoursSection = ({ park }: OpeningHoursSectionProps) => {
  return (
    <section
      id="park-opeing-hours-section"
      className="max-w-6xl px-5 sm:px-10 xl:px-5 mx-auto mt-5 mb-6 py-12"
      aria-labelledby="opening-hours-heading"
    >
      <div>
        <h2
          className="text-2xl md:text-4xl font-black tracking-tighter mb-6"
          id="opening-hours-heading"
        >
          Opening hours
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-1 gap-8 items-start">
        {/* Fallback if no operating hours to display */}
        {park.operatingHours.length === 0 && (
          <div className="mb-8">
            <p className="font-serif leading-relaxed mb-4">
              No operating hours information available. Please check out the
              park’s webpage for more information.
            </p>
            <a
              className="flex items-center gap-1 font-bold font-serif 
              hover:underline underline-offset-2"
              href={park.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Park’s webpage (opens in a new tab)"
            >
              Visit park webpage{" "}
              <MdOpenInNew aria-hidden="true" className="text-lg" />
            </a>
          </div>
        )}

        {/* Operating hours card */}
        {park.operatingHours.length > 0 &&
          park.operatingHours.map((hour) => (
            <div
              key={hour.name}
              className="max-w-4xl rounded-2xl p-4 bg-[var(--color-secondary)]"
            >
              {/* Title and description */}
              <h3 className="text-lg font-serif font-bold mb-2">{hour.name}</h3>
              <p className="font-serif leading-relaxed  mb-2">
                {hour.description}
              </p>

              {/* Dopdown weekly hours*/}
              <details className="group">
                <summary
                  className="cursor-pointer list-none font-serif font-semibold 
                  flex items-center justify-between gap-2 
                  text-[var(--color-primary)]"
                >
                  View weekly hours
                  <CiCircleChevDown
                    className="transition-transform duration-500 
                  group-open:rotate-180 text-4xl"
                  />
                </summary>
                <dl className="mt-4 font-serif">
                  {weekdayOrder.map((day) => (
                    <div key={day}>
                      <dt className="inline font-bold">
                        {day.charAt(0).toUpperCase() + day.slice(1)}:
                      </dt>{" "}
                      <dd className="inline">{hour.standardHours[day]}</dd>
                    </div>
                  ))}
                </dl>
              </details>
            </div>
          ))}
      </div>
    </section>
  );
};

export default OpeningHoursSection;
