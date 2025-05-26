import { WeatherDataResponse } from '../../../shared/data-access/weather';

export interface WeatherDataForDisplay {
  id: number;
  location: string;
  data: WeatherDataResponse;
}
