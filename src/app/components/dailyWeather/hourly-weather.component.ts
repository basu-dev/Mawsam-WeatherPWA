import { UIService } from './../../services/ui.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable, of } from 'rxjs';
import { DailyWeather, OneWeather } from 'src/app/model/weather';
import { WeatherService } from 'src/app/services/weather.service';
@Component({
  template: `<h4>
    Hourly Forecast
    </h4>
      <br />
      <app-partialweather
        *ngFor="let item of dailyData | async"
        [current]="item"
        unitWeatherType="hourly"
      ></app-partialweather>
      <button *ngIf='!this.ui.isBrowserMode' class='home'routerLink='/' >
      <app-svghome></app-svghome>
        </button>
    `,
})
export class HourlyWeatherComponent implements OnInit, OnDestroy {
  constructor(private weatherService: WeatherService,
    public ui: UIService
    ) {}
  private weatherSub: Subscription;
  public dailyData: Observable<DailyWeather[]>;
  ngOnInit(): void {
    this.weatherSub = this.weatherService.subject.subscribe(
      (result: OneWeather) => {
        this.dailyData = of(result.hourly.slice(1, 47));
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
