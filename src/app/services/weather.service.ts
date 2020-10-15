import { PartialWeather } from './../model/weather';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of, Subject, throwError, Subscription } from 'rxjs';
import { CurrentWeather, OneWeather, Place } from '../model/weather';

@Injectable({ providedIn: 'root' })
export class WeatherService {
  APP_ID = '2f111e4b3f03c4f196c708bc43c33f8b';
  weatherUrl = 'https://api.openweathermap.org/data/2.5/onecall';
  cityUrl = 'https://maps.googleapis.com/maps/api/place/findplacefromtext/json';
  currentWeatherUrl= 'https://api.openweathermap.org/data/2.5/weather';
  MY_API = 'AIzaSyCJ67H5QBLVTdO2pnmEmC2THDx95rWyC1g';
  lat = null;
  lon = null;
  geoTaken = false;
  public weatherData: OneWeather = null;
  public subject = new Subject<any>();
  public citySub = new Subject<Place>();
  public selectedCities: Place[] = [];
  public cityUpdatedSub = new Subject<Place[]>();

  constructor(public httpClient: HttpClient) {}
  public getGeolocation(): boolean {
    console.log("geolo")
    if (!this.geoTaken && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos: any): boolean => {
        this.lat = pos.coord.latitude;
        this.lon = pos.coord.longitude;
        console.log(this.lat,this.lon);
        return true;
      });
      return false;
    }
  }
  get(city?: Place): void {
    this.lat = city.lat;
    this.lon = city.lon;
    console.log(this.lat, this.lon);
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
          return { ...x, timezone: `${city.name}` };
        }),
        catchError(this.handleError<OneWeather>('get', {}))
      );
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
  public addCity(city: Place): void {
    this.selectedCities.push(city);
    this.dispatchCities();
    this.setCities();
  }
  public removeCity(city: Place): void {
    let index: number;
    this.selectedCities.forEach((x, i) => {
      if (x.name === city.name) {
        index = i;
      }
      if (index > -1) {
        this.selectedCities.splice(i, 1);
        this.dispatchCities();
        this.setCities();
      }
    });
    this.setCities();
  }
  public getCities(): void {
    const cities: Place[] = JSON.parse(localStorage.getItem('cities'));
    this.selectedCities = cities?cities:[];
    this.dispatchCities();
  }
  public setCities(): void{
    localStorage.setItem('cities', JSON.stringify(this.selectedCities));
  }
  private dispatchCities(): void {
    console.log("from dispatch")
    this.cityUpdatedSub.next( this.selectedCities );
  }
  public setDefaultCity(name: string, lat: number, lon: number): boolean {
    const val = { name, lat, lon };
    localStorage.setItem('default', JSON.stringify(val));
    return true;
  }
  public getDefaultCity(): any {
    return JSON.parse(localStorage.getItem('default'));
  }
  public getCurrentWeather(city: Place): Observable<PartialWeather> {
    let weather: PartialWeather = {};
    return this.httpClient
    .get<any>(this.currentWeatherUrl, {
      params: {
        lat: city.lat.toString(),
        lon: city.lon.toString(),
        APPID: this.APP_ID,
        units: 'metric',
        exclude: 'minutely',
      },
    }).pipe(
      tap(x=>console.log(x)),
      map((x:any)=>{
        weather.current= Math.round(x.main.temp);
        weather.max_temp= Math.round(x.main.temp_max);
        weather.min_temp= Math.round(x.main.temp_min);
        return weather;
      })
    )
  }

}
