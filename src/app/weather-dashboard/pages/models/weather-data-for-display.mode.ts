import { WeatherDataResponse } from '../../../shared/data-access/weather';

export interface WeatherDataForDisplay {
  location: string;
  data: WeatherDataResponse;
}
