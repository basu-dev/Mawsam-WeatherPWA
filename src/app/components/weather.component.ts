import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../services/weather.service';

@Component({
    selector: 'selector-weather',
    template: `
        <div>
            <input type="text" (keyup)="search(this.$event)" (value)="city" required>
            <div class="details">
                <h3>{{weather.weather[0].description}}</h3>
                Temperature: {{weather.main.temp}} K <br>
                Humidity:{{weather.main.humidity}}<br>
                Pressure: {{weather.main.pressure}}<br>
                Min. Temp: {{weather.main.temp_min}}<br>
                Max. Temp: {{weather.main.temp_max}}<br>
            </div>
        </div>
    `
})
export class WeatherComponent implements OnInit {
    constructor(public weatherService:WeatherService) { }
    ngOnInit() {
        this.weatherService.get('Wednedsay').subscribe(
            result=>console.log(result),
            err=>console.log(err)
        )
     }
     public city:string;
     public weather=null;
     getApi(city){
        this.weatherService.get(city).subscribe(
            result=>{
                console.log(result);
                this.weather=result;
                this.city=""
            },
            err=>console.log(err)
        )
     }
     search(e){
         console.log(e);
         if(e.key=='Enter'){
             this.getApi(e.target.value)
         }

     }
}