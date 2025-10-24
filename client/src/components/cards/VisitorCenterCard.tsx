import { useState } from "react";
import type { VisitorCenter } from "../../types/VisitorCenter";
import OpenToday from "../OpenToday";

interface VisitorCenterCardProps {
  vc: VisitorCenter;
}

const VisitorCenterCard = ({ vc }: VisitorCenterCardProps) => {
  const imageUrl = vc.images?.[0]?.url?.trim();
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <li className="py-2">
      <article
        className="grid sm:gap-2 grid-cols-1 sm:grid-cols-2 lg:grid-cols-6
         rounded-3xl bg-[var(--color-bg)] "
      >
        {/* Text container */}
        <div
          className={`col-span-1 sm:col-span-2 p-6 ${
            !imageUrl || imgFailed ? "lg:col-span-6" : "lg:col-span-4"
          }`}
        >
          <div className="flex flex-col justify-between h-full">
            {/* Visitor center name + description */}
            <div>
              <h3 className="text-2xl mb-2 font-black tracking-tighter">
                {vc.name}
              </h3>
              <p className="text-md font-serif leading-relaxed mb-2">
                {vc.description}
              </p>
            </div>

            {/* Open today */}
            <OpenToday operatingHours={vc.operatingHours} />
          </div>
        </div>

        {/* Image container */}
        <div
          className="col-span-1 sm:col-span-2 lg:col-span-2 flex flex-col 
        gap-2"
        >
          {imageUrl && !imgFailed ? (
            <img
              src={imageUrl}
              alt={vc.images[0].altText || vc.name}
              className="aspect-[3/2] rounded-b-3xl lg:rounded-br-3xl 
              lg:rounded-tr-3xl lg:rounded-bl-none lg:rounded-tl-none 
              object-cover w-full h-full"
              loading="lazy"
              onError={() => setImgFailed(true)}
            />
          ) : null}
        </div>
      </article>
    </li>
  );
};

export default VisitorCenterCard;
