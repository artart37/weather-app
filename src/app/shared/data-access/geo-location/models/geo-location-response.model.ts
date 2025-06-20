export interface GeoLocationResponse {
  results: GeoLocationResult[];
  generationtime_ms: number;
}

export interface GeoLocationResult {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  elevation: number;
  feature_code: FeatureCode;
  country_code: string;
  admin1_id: number;
  admin3_id?: number;
  admin4_id?: number;
  timezone: string;
  population?: number;
  postcodes?: string[];
  country_id: number;
  country: string;
  admin1: string;
  admin3?: string;
  admin4?: string;
  admin2_id?: number;
  admin2?: string;
}

export enum FeatureCode {
  Ppl = 'PPL',
  Pplc = 'PPLC',
}
