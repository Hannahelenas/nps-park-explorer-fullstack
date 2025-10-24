import type {
  Activity,
  Address,
  ContactInfo,
  OperatingHours,
  ParkImage,
  Topic,
} from "./Park";

export interface ApiPark {
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
