import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';
import { OneWeather } from '../model/weather';

@Injectable({ providedIn: 'root' })
export class WeatherService {
  APP_ID = '2f111e4b3f03c4f196c708bc43c33f8b';
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
  parseTemp(temp: number): number {
    return Math.round(temp - 273);
  }
  get(city: string): Observable<OneWeather> {
    this.lat = (27.71).toString();
    this.lon = (85.32).toString();
    return this.httpClient
      .get<OneWeather>(this.weatherUrl, {
        params: {
          lat: this.lat,
          lon: this.lon,
          APPID: this.APP_ID,
          units: 'metric',
          exclude: 'minutely',
        },
      })
      .pipe(catchError(this.handleError<OneWeather>('get', {})));
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      // this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
