import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable, of } from 'rxjs';
import { DailyWeather, OneWeather } from 'src/app/model/weather';
import { WeatherService } from 'src/app/services/weather.service';
@Component({
  template: `<h4>
    Hourly Forecast
    </h4>
      <br />
      <app-onedayweather
        *ngFor="let item of dailyData | async"
        [current]="item"
        unitWeatherType="hourly"
      ></app-onedayweather>
    `,
})
export class HourlyWeatherComponent implements OnInit, OnDestroy {
  constructor(private weatherService: WeatherService) {}
  private weatherSub: Subscription;
  public dailyData: Observable<DailyWeather[]>;
  ngOnInit(): void {
    this.weatherSub = this.weatherService.subject.subscribe(
      (result: OneWeather) => {
        this.dailyData = of(result.hourly.slice(1, 24));
      },
      (err) => console.log('Error in fetching data', err)
    );
    if (this.weatherService.weatherData) {
      this.weatherService.dispatchWeatherData();
    }
  }
  ngOnDestroy(): void {
    this.weatherSub.unsubscribe();
  }
}
