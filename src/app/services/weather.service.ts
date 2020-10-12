import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class WeatherService {
     APP_ID:string="f33a484cf794d08d0148764789aaba32";
     weatherUrl:string="https://api.openweathermap.org/data/2.5/weather"
    constructor(public httpClient: HttpClient) { }
    get(url:string){
        return this.httpClient.get(this.weatherUrl,{
            params:{
                APPID:"f33a484cf794d08d0148764789aaba32",
                q:'Kathmandu',
                units:'metrics'
            }
        });
    }
    
}