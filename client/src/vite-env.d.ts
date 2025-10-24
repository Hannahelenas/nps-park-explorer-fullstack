/// <reference types="vite/client" />

interface ViteTypeOptions {
  // By adding this line, you can make the type of ImportMetaEnv strict
  // to disallow unknown keys.
  strictImportMetaEnv: unknown;
}

interface ImportMetaEnv {
  readonly VITE_NPS_API_KEY: string;
  readonly VITE_NPS_ACTIVITIES_BASE_URL: string;
  readonly VITE_NPS_PARKS_BASE_URL: string;
  readonly VITE_NPS_PARKING_LOTS_BASE_URL: string;
  readonly VITE_NPS_THINGS_TO_DO_BASE_URL: string;
  readonly VITE_NPS_VISITORCENTERS_BASE_URL: string;
  readonly VITE_OPENWEATHER_API_KEY: string;
  readonly VITE_OPENWEATHER_BASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
