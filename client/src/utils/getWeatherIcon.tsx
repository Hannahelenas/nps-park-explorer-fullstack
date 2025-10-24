import {
  IoRainy,
  IoSnow,
  IoCloudy,
  IoThunderstorm,
  IoSunnyOutline,
} from "react-icons/io5";
import { MdOutlineCloud } from "react-icons/md";
import type { JSX } from "react/jsx-runtime";

const iconSize = "text-4xl";

const weatherIcons: Record<string, JSX.Element> = {
  clear: <IoSunnyOutline className={`${iconSize}`} />,
  clouds: <IoCloudy className={`${iconSize}`} />,
  rain: <IoRainy className={`${iconSize}`} />,
  drizzle: <MdOutlineCloud className={`${iconSize}`} />,
  thunderstorm: <IoThunderstorm className={`${iconSize}`} />,
  snow: <IoSnow className={`${iconSize}`} />,
};

export function getWeatherIcon(main: string): JSX.Element {
  return (
    weatherIcons[main.toLowerCase()] ?? (
      <MdOutlineCloud className={`${iconSize}`} />
    )
  );
}
