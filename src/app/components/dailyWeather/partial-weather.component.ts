import { WeatherService } from 'src/app/services/weather.service';
import { Component, Input, OnInit } from '@angular/core';
import { DailyWeather } from 'src/app/model/weather';
@Component({
  selector: 'app-onedayweather',
  template: `
    <div>
      <div *ngIf="current" class="day">{{ date.day }} <span>{{ time }}</span></div>
      <div *ngIf="current" class="weather-detail">
        <div>
          <small>Weather</small>
          <div class="info">{{ current.weather[0].main }}</div>
        </div>
        <div *ngIf="isHourly">
          <small>Temperature</small>
          <div class="info">{{ current.temp }}&deg;C</div>
        </div>
        <div>
          <small>Feels Like</small>
          <div class="info">{{ feelsLike }}&deg;C</div>
        </div>
        <div>
          <small>Humidity</small>
          <div class="info">{{ current.humidity }}%</div>
        </div>
        <div>
          <small>Wind Speed</small>
          <div class="info">{{ current.wind_speed }}km/h</div>
        </div>
        <div>
          <small>Pressure</small>
          <div class="info">{{ current.pressure }}hPa</div>
        </div>
        <div *ngIf="!isHourly">
          <small>UV Index</small>
          <div class="info">{{ current.uvi }}</div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
    *{
        font-family: Verdana;
    }
      .day{
          display:flex;
          justify-content:space-between;
          padding:5px 20px;
          background:var(--semilight-background);
          border-radius: 10px 10px 0 0;
          width:100%;
      }
      .weather-detail {
        margin:0 0 5px 0;
        text-align: left;
        background: var(--light-background);
        border-radius: 0 0 10px 10px;
        padding: 10px;
        display: grid;
        width: 100%;
        grid-template-columns: 3fr 2fr;
        grid-gap: 1rem;
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
export class OneDayWeatherComponent implements OnInit {
  @Input() public current: DailyWeather;
  @Input() public unitWeatherType: string;
  public time: string;
  public date: { day: string; time: string; date?: string };
  public isHourly = false;
  public feelsLike: any;
  constructor(private weatherService: WeatherService) {}
  ngOnInit(): void {
    console.log(this.unitWeatherType);
    this.date = this.weatherService.getTime(this.current.dt);
    if(this.unitWeatherType === 'hourly'){
        this.time = this.date.time;
        this.feelsLike = this.current.feels_like;
        this.isHourly = true;
    }
    else{
        this.time = this.date.date;
        this.feelsLike = this.current.feels_like.day;
    }
    this.time = (this.unitWeatherType === 'hourly') ?  this.date.time : this.date.date;
  }
}
