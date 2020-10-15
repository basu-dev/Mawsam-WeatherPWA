
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of, Subject, throwError } from 'rxjs';
import { OneWeather, Place } from '../model/weather';

@Injectable({ providedIn: 'root' })
export class WeatherService {
  APP_ID = '2f111e4b3f03c4f196c708bc43c33f8b';
  weatherUrl = 'https://api.openweathermap.org/data/2.5/onecall';
  cityUrl = 'https://maps.googleapis.com/maps/api/place/findplacefromtext/json';
  MY_API = 'AIzaSyCJ67H5QBLVTdO2pnmEmC2THDx95rWyC1g';
  lat = null;
  lon = null;
  geoTaken = false;
  public weatherData: OneWeather = null;
  public subject = new Subject<any>();
  public citySub = new Subject<Place>();

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
  get(city?: Place): void {
    this.lat = city.lat;
    this.lon = city.lon;
    console.log(this.lat,this.lon);
    const result = this.httpClient
      .get<OneWeather>(this.weatherUrl, {
        params: {
          lat: this.lat,
          lon: this.lon,
          APPID: this.APP_ID,
          units: 'metric',
          exclude: 'minutely',
        },
      })
      .pipe(
        map((x: OneWeather) => {
          return {...x, timezone: `abc/${city.name}}`
        }; }),
        catchError(this.handleError<OneWeather>('get', {})));
    const subsc = result.subscribe((data) => {
      this.weatherData = data;
      this.subject.next({ ...this.weatherData });
    });
  }
  getTime(): string {
    const a: Date = new Date();
    let hours = a.getHours();
    let sit = 'AM';
    if (hours > 12) {
      hours = hours - 12;
      sit = 'PM';
    }
    return `${hours}:${a.getMinutes()} ${sit}`;
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
  public setCity(name: string, lat: number, lon: number): boolean {
    const val = { name, lat, lon };
    localStorage.setItem('default', JSON.stringify(val));
    return true;
  }
  public getCity(): any {
    return JSON.parse(localStorage.getItem("default"));
  }
}
