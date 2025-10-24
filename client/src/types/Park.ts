export interface Park {
  id: string;
  url: string;
  fullName: string;
  parkCode: string;
  description: string;
  activities: Activity[];
  topics: Topic[];
  states: string;
  directionsInfo: string;
  images: ParkImage[];
  weatherInfo: string;
  name: string;
  designation: string;
  addresses: Address[];
  operatingHours: OperatingHours[];
  contacts: ContactInfo;
  latLong: string;
}

export interface Activity {
  id: string;
  name: string;
}

export interface Topic {
  id: string;
  name: string;
}

export interface ParkImage {
  credit: string;
  title: string;
  altText: string;
  caption: string;
  url: string;
}

export interface Address {
  postalCode: string;
  city: string;
  stateCode: string;
  countryCode: string;
  line1: string;
  line2?: string;
  line3?: string;
  type: "Physical" | "Mailing";
}

export interface OperatingHours {
  description: string;
  standardHours: Record<Weekday, string>;
  name: string;
}

export type Weekday =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";

export const weekdayOrder: Weekday[] = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

export interface ContactInfo {
  phoneNumbers: PhoneNumber[];
  emailAddresses: EmailAddress[];
}

export interface PhoneNumber {
  phoneNumber: string;
  type: "Voice" | "Fax" | "TTY";
}

export interface EmailAddress {
  emailAddress: string;
}
