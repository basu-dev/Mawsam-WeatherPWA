import { DailyWeather, OneWeather } from './../../model/weather';
import { Observable, Subscription, of } from 'rxjs';
import { Component, OnInit, OnDestroy} from '@angular/core';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
    template: `
        <h4>1 Week Forecast<h4><br>
        <app-onedayweather *ngFor="let item of (dailyData | async)"  [current]='item'></app-onedayweather>`,
})
export class DailyWeatherComponent implements OnInit, OnDestroy {
    constructor(private weatherService: WeatherService){}
    private weatherSub: Subscription;
    public dailyData: Observable<DailyWeather[]>;
    ngOnInit(): void {
        this.weatherSub = this.weatherService.subject.subscribe(
            (result: OneWeather) => {
                console.log('hey')
                this.dailyData = of(result.daily);
            },
            (err)=>console.log('Error in fetching data',err)
            );
        if(this.weatherService.weatherData){
            this.weatherService.dispatchWeatherData();
          }
    }
    ngOnDestroy(): void{
        this.weatherSub.unsubscribe();
    }
}