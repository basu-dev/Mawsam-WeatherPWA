import { DailyWeather, OneWeather } from './../../model/weather';
import { Observable, Subscription, of } from 'rxjs';
import { Component, OnInit, OnDestroy , AfterViewInit} from '@angular/core';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
    selector: 'app-dailyweather',
    templateUrl: 'daily-weather.component.html',
    styleUrls: ['daily-weather.component.css']
})
export class DailyWeatherComponent implements OnInit, OnDestroy {
    constructor(private weatherService: WeatherService){}
    private weatherSub: Subscription;
    public dailyData: Observable<DailyWeather[]>;
    ngOnInit() {
        console.log("oninit from daily weather")
        this.dailyData = of(this.weatherService.weatherData.daily);
        console.log(this.weatherService.weatherData);
        this.weatherSub = this.weatherService.subject.subscribe(
            (result: OneWeather) => {
                console.log('hey')
                this.dailyData = of(result.daily);
            },
            (err)=>console.log('Error in fetching data',err)
        );
    }
    ngOnDestroy(): void{
        this.weatherSub.unsubscribe();
    }
}