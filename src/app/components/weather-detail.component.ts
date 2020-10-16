import { Subscription } from 'rxjs';
import { OneWeather, CurrentWeather } from './../model/weather';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { WeatherService } from '../services/weather.service';

@Component({
  selector: 'app-weather-detail',
  template: `
  <div>
    <h4>Weather Detail</h4>
    <div *ngIf="current" class="weather-detail">
        <div>
            <small>Sunrise</small>
            <div class="info">{{current.sunrise}}</div>
        </div>
        <div>
            <small>Sunset</small>
            <div class="info">{{current.sunset}}</div>
        </div>
        <div>
            <small>Real Feel</small>
            <div class="info">{{current.feels_like}}&deg;C</div>
        </div>
        <div>
            <small>Humidity</small>
            <div class="info">{{current.humidity}}%</div>
        </div>
        <div>
            <small>Wind Speed</small>
            <div class="info">{{current.wind_speed}}km/h</div>
        </div>
        <div>
            <small>Pressure</small>
            <div class="info">{{current.pressure}}hPa</div>
        </div>
        <div>
            <small>UV Index</small>
            <div class="info">{{current.uvi}}</div>
        </div>
        <div>
            <small>Visibility</small>
            <div class="info">{{current.visibility}}%</div>
        </div>
    </div>
</div>

  `,
  styles: [`
    .weather-detail{
        margin-top:10px;
        text-align:left;
        background:#00000030;
        border-radius:10px;
        padding:10px;
        display:grid;
        width:100%;
        grid-template-columns:3fr 2fr;
        grid-gap:1rem;

    }
    .weather-detail small{
        font-size:.8rem;
    }
    .weather-detail div{
        font-size:1.1rem;
    }
`]
})
export class WeatherDetailComponent implements OnInit, OnDestroy {
  constructor(public weatheService: WeatherService) {}
  public current: CurrentWeather;
  public sunrise: number;
  public sunset: number;
  public weatherSubscription: Subscription;
  ngOnInit(): void {
    this.weatherSubscription = this.weatheService.subject.subscribe((x: OneWeather) => {
        this.current = x.current;
        this.sunrise = x.daily[0].sunrise;
        this.sunset = x.daily[0].sunset;
    });
  }
  ngOnDestroy(): void{
      this.weatherSubscription.unsubscribe();
  }
}
