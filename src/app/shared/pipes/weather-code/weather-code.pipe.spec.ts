import { WaWeatherCodePipe } from './weather-code.pipe';

describe('WeatherCodePipe', () => {
  it('create an instance', () => {
    const pipe = new WaWeatherCodePipe();
    expect(pipe).toBeTruthy();
  });
});
