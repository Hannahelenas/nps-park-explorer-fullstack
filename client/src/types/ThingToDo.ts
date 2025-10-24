export interface ThingToDo {
  id: string;
  url: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  images: ThingToDoImage[];
  relatedParks: RelatedPark[];
  tags: string[];
  latitude: string;
  longitude: string;
  location: string;
  season: string[];
  topics: Topic[];
  activities: Activity[];
  activityDescription: string;
  seasonDescription: string;
  timeOfDay: string[];
  duration: string;
  durationDescription: string;
  accessibilityInformation: string;
  petsDescription: string;
  arePetsPermitted: string;
  arePetsPermittedWithRestrictions: string;
  doFeesApply: string;
  feeDescription: string;
  isReservationRequired: string;
  reservationDescription: string;
  locationDescription: string;
  credit: string;
  relevanceScore: number;
}

export interface ThingToDoImage {
  url: string;
  credit: string;
  altText: string;
  title: string;
  description: string;
  caption: string;
  crops: Crop[];
}

export interface Crop {
  aspectRatio: string;
  url: string;
}

export interface RelatedPark {
  states: string;
  parkCode: string;
  designation: string;
  fullName: string;
  url: string;
  name: string;
}

export interface Topic {
  id: string;
  name: string;
}

export interface Activity {
  id: string;
  name: string;
}
