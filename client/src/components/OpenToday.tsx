import type { VisitorCenterOperatingHours } from "../types/VisitorCenter";
import type { Weekday } from "../types/Park";

function getTodayWeekday(): Weekday {
  return new Date()
    .toLocaleDateString("en-US", { weekday: "long" })
    .toLowerCase() as Weekday;
}

interface OpenTodayProps {
  operatingHours: VisitorCenterOperatingHours[];
}

const OpenToday = ({ operatingHours }: OpenTodayProps) => {
  if (!operatingHours || operatingHours.length === 0) {
    return null;
  }

  const today = getTodayWeekday();
  const firstSchedule = operatingHours[0];
  const todayHours = firstSchedule?.standardHours[today];

  if (!todayHours) return null;

  const text =
    todayHours.toLowerCase() !== "closed"
      ? `Open today ${todayHours}`
      : "Closed today";

  return <p className="font-bold font-serif leading-relaxed">{text}</p>;
};

export default OpenToday;
