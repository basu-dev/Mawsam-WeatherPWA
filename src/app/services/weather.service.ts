import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map,tap} from "rxjs/operators";
// import { Observable } from 'rxjs';
import {Observable, of} from 'rxjs';
import { Weather } from '../components/model/weather';



@Injectable({providedIn: 'root'})
export class WeatherService {
     APP_ID:string="f33a484cf794d08d0148764789aaba32";
     weatherUrl:string="https://api.openweathermap.org/data/2.5/weather"
    constructor(public httpClient: HttpClient) { }
    get(city:string):Observable<Weather>{
        // return this.httpClient.get(this.weatherUrl,{
        //     params:{
        //         APPID:"f33a484cf794d08d0148764789aaba32",
        //         q:city,
        //         units:'metrics'
        //     }
        // }).pipe(
        //     map(data=>{return data}),
        //     tap(data=>{
        //         localStorage.setItem(data.name,JSON.stringify(data));
        //     })
        // )
        let weather=JSON.parse(localStorage.getItem(city));
       return of(weather).pipe(
           map((d:any):Weather=>{
            return  {
                city:d.name,
                description:d.weather[0].description,
                temp:d.main.temp -273,
                max_temp:d.main.temp - 273,
                min_temp:d.main.temp_min -273,
                feels_like:d.main.feels_like,
                humidity:d.main.humidity,
                pressure:d.main.pressure,
                icon:d.weather[0].icon,
                main:d.weather[0].main,
                sunRise:d.sys.sunrise,
                sunSet:d.sys.sunset
                
            }
           })
       )
    }
    
}