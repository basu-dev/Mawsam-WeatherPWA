import { UIService } from './../../services/ui.service';
import { WeatherService } from 'src/app/services/weather.service';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { DailyWeather } from 'src/app/model/weather';
@Component({
  selector: 'app-partialweather',
  template: `
      <div *ngIf="current" class="day">
        {{ time }} <span>{{ date.day }}</span>
      </div>
      <div *ngIf="current" class="weather-detail">
        <div>
          <small>Weather</small>
          <div class="info">{{ current.weather[0].main }}</div>
        </div>
        <div>
          <small>Temperature</small>
          <div class="info">
            <span *ngIf="isHourly; else hourly">{{ temperature }}</span
            ><span *ngIf="isHourly">&deg;C</span>
          </div>
          <ng-template #hourly
            >{{ temperature.min }}&deg; /
            {{ temperature.max }}&deg;</ng-template
          >
        </div>
        <div>
          <small>Feels Like</small>
          <div class="info">
            <span *ngIf="isHourly; else hourly">{{ feelsLike }}</span
            ><span *ngIf="isHourly">&deg;C</span>
          </div>
          <ng-template #hourly
            >{{ feelsLike.min }}&deg; / {{ feelsLike.max }}&deg;</ng-template
          >
        </div>
        <div>
          <small>Humidity</small>
          <div class="info">{{ current.humidity }}%</div>
        </div>
        <div>
          <small>Wind Speed</small>
          <div class="info">{{ current.wind_speed }} km/h</div>
        </div>
        <div>
          <small>Pressure</small>
          <div class="info">{{ current.pressure }}hPa</div>
        </div>
      </div>
    
  `,
  styles: [
    `
      * {
        font-family: Verdana;
      }
      .day {
        display: flex;
        justify-content: space-between;
        padding: 5px 20px;
        background: var(--semilight-background);
        border-radius: 10px 10px 0 0;
        width: 100%;
      }
      .weather-detail::before{
        position :absolute;
        top:0;
        left: 0;
        width:100%;
        height:100%;
        content:'';
        background:var(--semilight-background);
        z-index:-1;
        border-radius:0 0 10px 10px;
      }
      .weather-detail {
        margin: 0 0 5px 0;
        text-align: left;
        background: var(--light-background);
        border-radius:10px;
        padding: 10px;
        display: grid;
        width: 100%;
        grid-template-columns: 3fr 2fr;
        grid-gap: 1rem;
        position:relative;
      }
      .weather-detail small {
        font-size: 0.8rem;
      }
      .weather-detail div {
        font-size: 1.1rem;
      }
    `,
  ],
})
export class OneDayWeatherComponent implements OnInit, OnDestroy {
  @Input() public current: DailyWeather;
  @Input() public unitWeatherType: string;
  public time: string;
  public date: { day: string; time: string; date?: string };
  public isHourly = false;
  public feelsLike: any;
  public temperature: any;
  constructor(
    private weatherService: WeatherService,
    private uiSerivce: UIService
  ) {}
  ngOnInit(): void {
    this.date = this.weatherService.getTime(this.current.dt);
    if (this.unitWeatherType === 'hourly') {
      this.time = this.date.time;
      this.feelsLike = this.current.feels_like;
      this.isHourly = true;
      this.uiSerivce.hourlyButtonSub.next(false);
      this.temperature = this.current.temp.toString();
    } else {
      this.time = this.date.date;
      this.feelsLike = this.current.feels_like.day;
      this.temperature = {
        min: this.current.temp.max.toFixed(),
        max: this.current.temp.min.toFixed(),
      };
      this.feelsLike = {
        min: this.current.feels_like.day.toFixed(),
        max: this.current.feels_like.night.toFixed(),
      };
    }
    this.time =
      this.unitWeatherType === 'hourly' ? this.date.time : this.date.date;
  }
  ngOnDestroy(): void {
    if (this.isHourly) {
      this.uiSerivce.hourlyButtonSub.next(true);
    }
  }
}
