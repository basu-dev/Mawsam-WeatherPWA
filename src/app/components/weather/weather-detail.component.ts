import { UIService } from './../../services/ui.service';
import { Subscription } from 'rxjs';
import { OneWeather, CurrentWeather } from '../../model/weather';
import { Component, OnDestroy, OnInit} from '@angular/core';
import { WeatherService } from '../../services/weather.service';

@Component({
  selector: 'app-weatherdetail',
  template: `
  <div>
      <h4 *ngIf="current">Current Data</h4><br>
      <div *ngIf="current" class="weather-detail">
        <div>
            <small>Sunrise</small>
            <div class="info">{{sunrise}}</div>
        </div>
        <div>
            <small>Sunset</small>
            <div class="info">{{sunset}}</div>
        </div>
        <div>
            <small>Feels Like</small>
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
            <div class="info">{{current.visibility}}m</div>
        </div>
    </div>
    <div *ngIf="showHourlyBtn" class="forecast-btn-place">
        <a class="weekly-forecast-btn" routerLink='forecast/hourly'>Hourly Forecast</a>
    </div>
</div>


  `,
  styles: [`
    .weather-detail{
        text-align:left;
        background:var(--light-background);
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
  constructor(public weatherService: WeatherService, private uiService: UIService) {}
  public current: CurrentWeather;
  public sunrise: string;
  public sunset: string;
  public showHourlyBtn = true;
  public weatherSubscription: Subscription;
  ngOnInit(): void {
    this.weatherSubscription = this.weatherService.subject.subscribe((x: OneWeather) => {
        console.log(x, 'from weather detail');
        this.current = x.current;
        this.sunrise = this.weatherService.getTime(x.daily[0].sunrise).time;
        this.sunset = this.weatherService.getTime(x.daily[0].sunset).time;
    });
    this.uiService.hourlyButtonSub.subscribe((showHourlyBtn: boolean)=>this.showHourlyBtn = showHourlyBtn);

  }
  ngOnDestroy(): void{
      this.weatherSubscription.unsubscribe();
  }
}
