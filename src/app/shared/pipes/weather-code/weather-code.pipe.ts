import { Pipe, PipeTransform } from '@angular/core';
import { getWeatherByCode } from '../../utils';

@Pipe({
  name: 'waWeatherCode',
  standalone: true,
})
export class WaWeatherCodePipe implements PipeTransform {
  transform(value: number): string {
    return getWeatherByCode(value);
  }
}
