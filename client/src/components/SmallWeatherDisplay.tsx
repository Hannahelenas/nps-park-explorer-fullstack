import { getWeatherIcon } from "../utils/getWeatherIcon";

interface SmallWeatherDisplayProps {
  temp: number;
  main: string;
}

const SmallWeatherDisplay = ({ temp, main }: SmallWeatherDisplayProps) => {
  return (
    <div className="flex flex-col items-start">
      <div className="flex items-center justify-between gap-2">
        {getWeatherIcon(main)}
        <p className="text-lg font-bold">{Math.round(temp)}°C</p>
      </div>
    </div>
  );
};

export default SmallWeatherDisplay;
