import type { ContactInfo, Weekday } from "./Park";

export interface ParkingLot {
  id: string;
  name: string;
  altName?: string;
  description: string;
  relatedParks: RelatedPark[];
  latitude: number;
  longitude: number;
  geometryPoiId?: string;
  managedByOrganization: string;
  timeZone: string;
  contacts: ContactInfo;
  fees: ParkingFee[];
  operatingHours: ParkingOperatingHours[];
  images: ParkImage[];
  accessibility: ParkingAccessibility;
  liveStatus: ParkingLiveStatus;
}

export interface RelatedPark {
  states: string;
  parkCode: string;
  designation: string;
  fullName: string;
  url: string;
  name: string;
}

export interface ParkingFee {
  cost: string;
  description: string;
  title: string;
}

export interface ParkingOperatingHours {
  description: string;
  standardHours: Record<Weekday, string>;
  exceptions: OperatingHoursException[];
  name: string;
}

export interface OperatingHoursException {
  exceptionHours: Record<Weekday, string>;
  startDate: string;
  endDate: string;
  name: string;
}

export interface ParkingAccessibility {
  isLotAccessibleToDisabled: boolean;
  totalSpaces: number;
  numberofAdaSpaces: number;
  numberofAdaVanAccessbileSpaces: number;
  numberofAdaStepFreeSpaces: number;
  numberOfOversizeVehicleSpaces: number;
  adaFacilitiesDescription: string;
}

export interface ParkingLiveStatus {
  isActive: boolean;
  occupancy: string;
  estimatedWaitTimeInMinutes: number | null;
  description: string;
  expirationDate: string;
}

export interface PhoneNumber {
  phoneNumber: string;
  type: "Voice" | "Fax" | "TTY";
}

export interface EmailAddress {
  emailAddress: string;
}

export interface ParkImage {
  credit: string;
  title: string;
  altText: string;
  caption: string;
  url: string;
}
