import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Observable, of, Subject } from 'rxjs';
import { PartialWeather, OneWeather, Place } from '../model/weather';

@Injectable({ providedIn: 'root' })
export class WeatherService {
  APP_ID = environment.APP_ID;
  // weatherUrl = 'https://api.openweathermap.org/data/2.5/onecall';
  weatherUrl = 'http://localhost:3000/onekathmandu';
  cityUrl = 'https://maps.googleapis.com/maps/api/place/findplacefromtext/json';
  // currentWeatherUrl = 'https://api.openweathermap.org/data/2.5/weather';
  currentWeatherUrl = 'http://localhost:3000/thapathali';
  MY_API = environment.MY_API;
  POSITION_KEY = environment.POSITION_KEY;
  lat = null;
  lon = null;
  geoTaken = false;
  public weatherData: OneWeather;
  // subjects
  public subject = new Subject<any>();
  public citySub = new Subject<Place>();
  public cityUpdatedSub = new Subject<Place[]>();
  public selectedCities: Place[] = [];

  constructor(public httpClient: HttpClient) {}
  // get current locations 
  public getGeolocation(): void {
    if (!this.geoTaken && navigator.geolocation) {
      this.getPosition()
        .then((x) => {
          this.get(x);
        })
        .catch((e) => {
          this.get(e);
        });
    }
  }
  getPosition(): Promise<Place> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (resp) => {
          console.log('success');
          resolve({
            lon: resp.coords.longitude,
            lat: resp.coords.latitude,
            name: 'Your Location',
          });
        },
        (err) => {
          console.log(err);
          resolve({ lon: 27.71, lat: 85.31, name: 'Your Location' });
        }
      );
    });
  }
  // get weather
  get(city?: Place): void {
    console.log('getin');
    this.lat = city.lat;
    this.lon = city.lon;
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
        map((x: any) => {
          console.log('Unprocessed Data: ',x);
          x.current.dt = this.getTime(x.current.dt);
          if (this.cityAlreadyAdded(city) > -1) {
            x.added = true;
          }
          return { ...x, timezone: `${city.name}` };
        }),
        catchError(this.handleError<OneWeather>('get', {}))
      )
      .subscribe((data) => {
      this.weatherData = data;
      this.dispatchWeatherData();
    });
  }
  public dispatchWeatherData(): void{
    this.subject.next({...this.weatherData});
  }
  public getCurrentWeather(city: Place): Observable<PartialWeather> {
    const weather: PartialWeather = {};
    return this.httpClient
      .get<any>(this.currentWeatherUrl, {
        params: {
          lat: city.lat.toString(),
          lon: city.lon.toString(),
          APPID: this.APP_ID,
          units: 'metric',
          exclude: 'minutely',
        },
      })
      .pipe(
        map((x: any) => {
          weather.current = Math.round(x.main.temp);
          weather.max_temp = Math.round(x.main.temp_max);
          weather.min_temp = Math.round(x.main.temp_min);
          return weather;
        })
      );
  }
  getTime(unixtime?: number): { time: string; day: string; date?: string } {
    const a = unixtime > 0 ? new Date(unixtime * 1000) : new Date();
    let hours = a.getHours();
    let sit = 'AM';
    if (hours >= 12) {
      hours = hours - 12;
      sit = 'PM';
    }
    const month = a.toString().split(' ')[1];
    const  day = a.getDate();
    return { time: `${hours}: ${a.getMinutes()} ${sit}`, day: this.parseDay(a.getDay()) , date: `${month} ${day}` };
  }
  parseDay(day: number): string{
    const days = {
      0: 'Monday',
      1: 'Tuesday',
      2: 'Wednesday',
      3: 'Thursday',
      4: 'Friday',
      5: 'Saturday',
      6: 'Sunday'
    };
    return days[day];
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
    if (this.cityAlreadyAdded(city) === -1) {
      this.selectedCities.unshift(city);
      this.dispatchCities();
      this.setCities();
    }
  }
  private cityAlreadyAdded(city: Place): number {
    let index = -1;
    this.selectedCities.forEach((x, i) => {
      if (x.name === city.name) {
        index = i;
      }
    });
    return index;
  }
  public removeCity(city: Place): void {
    const index = this.cityAlreadyAdded(city);
    if (index > -1) {
      this.selectedCities.splice(index, 1);
      this.dispatchCities();
      this.setCities();
    }
  }
  public getCities(): void {
    const cities: Place[] = JSON.parse(localStorage.getItem('cities'));
    this.selectedCities = cities ? cities : [];
    this.dispatchCities();
  }
  public setCities(): void {
    localStorage.setItem('cities', JSON.stringify(this.selectedCities));
  }
  private dispatchCities(): void {
    this.cityUpdatedSub.next(this.selectedCities);
  }
  public setDefaultCity(name: string, lat: number, lon: number): boolean {
    const val = { name, lat, lon };
    localStorage.setItem('default', JSON.stringify(val));
    return true;
  }
  public getDefaultCity(): any {
    return JSON.parse(localStorage.getItem('default'));
  }
}
