import type { Address, ContactInfo, Weekday } from "./Park";

export interface VisitorCenter {
  id: string;
  url: string;
  name: string;
  parkCode: string;
  description: string;
  latitude: string;
  longitude: string;
  latLong: string;
  audioDescription: string;
  geometryPoiId: string;
  amenities: string[];
  contacts: ContactInfo;
  directionsInfo: string;
  directionsUrl: string;
  operatingHours: VisitorCenterOperatingHours[];
  addresses: Address[];
  images: VisitorCenterImage[];
}

export interface VisitorCenterOperatingHours {
  exceptions: VisitorCenterOperatingHoursException[];
  description: string;
  standardHours: Record<Weekday, string>;
  name: string;
}

export interface VisitorCenterOperatingHoursException {
  exceptionHours: Record<Weekday, string>;
  startDate: string;
  name: string;
  endDate: string;
}

export interface VisitorCenterImage {
  credit: string;
  title: string;
  altText: string;
  caption: string;
  url: string;
}
