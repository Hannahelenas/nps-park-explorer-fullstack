import React, { useEffect, useState } from "react";
//import { IoArrowForward } from "react-icons/io5";
import { Link } from "react-router-dom";
import { fetchActivities } from "../../api/activities";

export interface Activity {
  id: string;
  name: string;
  imageUrl?: string;
}

const ActivitiesSection: React.FC = () => {
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    fetchActivities()
      .then(setActivities)
      .catch((err) => console.error("Error fetching activities:", err));
  }, []);

  return (
    <section
      id="activities-section"
      className="max-w-6xl mx-auto px-5 sm:px-10 lg:px-10 xl:px-5 py-12 "
    >
      <h2
        className="text-3xl lg:text-4xl mb-10 tracking-tighter font-serif 
      mt-8 text-center text-[var(--color-text)]"
      >
        What would you like to do?
      </h2>
      <p
        className="text-center font-serif leading-relaxed mb-12 w-[90%] 
      lg:w-[50%] mx-auto text-md"
      >
        From the activities you love to adventures you’ve yet to try, discover
        the perfect parks for every experience.
      </p>
      <div
        className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4
      xl:grid-cols-5 gap-3 md:gap-4 xl:gap-6"
      >
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="flex flex-col items-center text-center hover:scale-105 
            transition-transform"
          >
            {activity.imageUrl && (
              <img
                src={activity.imageUrl}
                alt={activity.name}
                className="w-40 h-40 sm:w-45 sm:h-45 object-cover rounded-full 
                shadow-sm"
              />
            )}
            <h3 className="mt-4 text-lg font-bold tracking-tighter">
              {activity.name}
            </h3>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-12">
        <Link
          to="/parks"
          className="bg-[var(--color-primary)] border-2 
            border-[var(--color-primary)] px-6 py-3 text-white rounded-full 
            leading-relaxed
            transition-all 
            duration-300 ease-in-out hover:cursor-pointer hover:bg-transparent
            hover:text-black 
            hover:border-[var(--color-primary)]"
        >
          View all activites
        </Link>
      </div>
    </section>
  );
};

export default ActivitiesSection;
