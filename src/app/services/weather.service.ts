import { OneWeather } from './../components/model/weather';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
// import { Observable } from 'rxjs';
import { Observable, of, throwError } from 'rxjs';
import { Weather } from '../components/model/weather';
import { error } from 'console';

@Injectable({ providedIn: 'root' })
export class WeatherService {
  APP_ID = 'f33a484cf794d08d0148764789aaba32';
  weatherUrl = 'https://api.openweathermap.org/data/2.5/onecall';
  lat = null;
  lon = null;
  geoTaken = false;
  constructor(public httpClient: HttpClient) {}
  private getGeolocation(): boolean {
    if (!this.geoTaken && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos: any): boolean => {
        this.lat = pos.coord.latitude;
        this.lon = pos.coord.longitude;
        return true;
      });
      return false;
    }
  }
  get(city: string): Observable<OneWeather> {
    this.lat = 27.71.toString();
    this.lon = 85.32.toString();

    
    return this.httpClient
      .get(this.weatherUrl, {
        params: {
          lat: this.lat,
          lon: this.lon,
          APPID: 'f33a484cf794d08d0148764789aaba32',
          units: 'metrics',
          exclude: 'minutely',
        },
      })
      .pipe(
        tap((x) => console.log(x)),
        map(
          (data: any): OneWeather => {
            return {
              current: data.current,
              daily: data.daily,
              hourly: data.hourly,
            };
          }
        )
      );
    // let weather = JSON.parse(localStorage.getItem(city));
    // return of(weather).pipe(
    //   map(
    //     (d: any): Weather => {
    //       return {
    //         city: d.name,
    //         description: d.weather[0].description,
    //         temp: d.main.temp - 273,
    //         max_temp: d.main.temp - 273,
    //         min_temp: d.main.temp_min - 273,
    //         feels_like: d.main.feels_like,
    //         humidity: d.main.humidity,
    //         pressure: d.main.pressure,
    //         icon: d.weather[0].icon,
    //         main: d.weather[0].main,
    //         sunRise: d.sys.sunrise,
    //         sunSet: d.sys.sunset,
    //       };
    //     }
    //   )
    // );
  }
}


