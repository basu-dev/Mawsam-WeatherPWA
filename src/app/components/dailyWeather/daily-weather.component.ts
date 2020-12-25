import { UIService } from './../../services/ui.service';
import { DailyWeather, OneWeather } from './../../model/weather';
import { Observable, Subscription, of } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  template: ` <h4>
    1 Week Forecast
    </h4>
    <br>
      <app-partialweather
        *ngFor="let item of dailyData | async"
        [current]="item"
      ></app-partialweather>
      <button *ngIf='!this.ui.isBrowserMode' class='home'routerLink='/' >
      <app-svghome></app-svghome>
      </button>
      `,
})
export class DailyWeatherComponent implements OnInit, OnDestroy {
  constructor(private weatherService: WeatherService,
    public ui:UIService
    ) {}
  private weatherSub: Subscription;
  public dailyData: Observable<DailyWeather[]>;
  ngOnInit(): void {
    this.weatherSub = this.weatherService.subject.subscribe(
      (result: OneWeather) => {
        this.dailyData = of(result.daily);
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
