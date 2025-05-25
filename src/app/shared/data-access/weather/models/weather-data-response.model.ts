export interface CurrentWeather {
  time: Date;
  temperature2m: number;
  relativeHumidity2m: number;
  apparentTemperature: number;
  isDay: number;
  rain: number;
  precipitation: number;
  showers: number;
  snowfall: number;
  weatherCode: number;
  cloudCover: number;
  pressureMsl: number;
  surfacePressure: number;
  windSpeed10m: number;
  windDirection10m: number;
  windGusts10m: number;
}

export interface DailyForecast {
  time: Date[];
  weatherCode: number[];
  temperature2mMax: number[];
  temperature2mMin: number[];
  apparentTemperatureMax: number[];
  apparentTemperatureMin: number[];
  sunrise: Date[];
  sunset: Date[];
  daylightDuration: number[];
  sunshineDuration: number[];
  windSpeed10mMax: number[];
  windGusts10mMax: number[];
  uvIndexMax: number[];
  uvIndexClearSkyMax: number[];
  rainSum: number[];
  showersSum: number[];
  snowfallSum: number[];
  precipitationSum: number[];
  precipitationHours: number[];
  precipitationProbabilityMax: number[];
  windDirection10mDominant: number[];
  shortwaveRadiationSum: number[];
  et0FaoEvapotranspiration: number[];
}

export interface HourlyForecast {
  time: Date[];
  isDay: number[];
  temperature2m: number[];
  relativeHumidity2m: number[];
  weatherCode: number[];
  precipitation: number[];
  rain: number[];
  showers: number[];
  snowfall: number[];
  snowDepth: number[];
  apparentTemperature: number[];
  dewPoint2m: number[];
  precipitationProbability: number[];
  sunshineDuration: number[];
  uvIndex: number[];
  uvIndexClearSky: number[];
  wetBulbTemperature2m: number[];
  totalColumnIntegratedWaterVapour: number[];
  cape: number[];
  liftedIndex: number[];
  convectiveInhibition: number[];
  freezingLevelHeight: number[];
  boundaryLayerHeight: number[];
  windSpeed10m: number[];
  windSpeed80m: number[];
  windSpeed120m: number[];
  windSpeed180m: number[];
  windDirection10m: number[];
  windDirection80m: number[];
  windDirection120m: number[];
  windDirection180m: number[];
  temperature80m: number[];
  windGusts10m: number[];
  temperature120m: number[];
  temperature180m: number[];
  soilTemperature0cm: number[];
  soilTemperature6cm: number[];
  soilTemperature18cm: number[];
  soilTemperature54cm: number[];
  soilMoisture0To1cm: number[];
  soilMoisture1To3cm: number[];
  soilMoisture3To9cm: number[];
  soilMoisture9To27cm: number[];
  soilMoisture27To81cm: number[];
  pressureMsl: number[];
  surfacePressure: number[];
  cloudCover: number[];
  cloudCoverLow: number[];
  cloudCoverMid: number[];
  cloudCoverHigh: number[];
  visibility: number[];
  evapotranspiration: number[];
  et0FaoEvapotranspiration: number[];
  vapourPressureDeficit: number[];
}

export interface WeatherDataResponse {
  current: CurrentWeather;
  daily?: DailyForecast;
  hourly?: HourlyForecast;
}
