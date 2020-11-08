import { UIService } from '../../services/ui.service';
import { Place, OneWeather } from '../../model/weather';
import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Subscription } from 'rxjs';

import { WeatherService } from '../../services/weather.service';
import { CurrentWeather, DailyWeather } from '../../model/weather';

@Component({
  selector: 'app-weather',
  styleUrls: ['weather.component.css'],
  templateUrl: 'weather.component.html',
})
export class WeatherComponent implements OnInit, OnDestroy {
  constructor(
    public weatherService: WeatherService,
    public uiSerivce: UIService
  ) {}
  @ViewChild('default') default: ElementRef;
  public placeholder = '';
  public city: string;
  public weather: CurrentWeather;
  public daily: DailyWeather[];
  public todayIcon: string;
  public tomorrowIcon: string;
  public nextDayIcon: string;
  public currentIcon: string;
  public sub: Subscription;
  public citySubscripton: Subscription;
  public cityDetail: Place;
  public time: { time: string; day: string };
  public thirdDay: string;
  ngOnInit(): void {
    // this line below is for offline testing should be removed whilest access to internet
    // this.weatherService.get({ lat: 32.34, lon: 23.23, name: 'Location' });
    // this.weatherService.dispatchWeatherData();

    this.citySubscripton = this.weatherService.citySub.subscribe(
      (x: Place): void => {
        if (x.lat) {
          this.weatherService.get(x);
        }
        this.cityDetail = x;
      }
    );
    this.sub = this.weatherService.subject.subscribe(
      (result: OneWeather) => {
        this.weather = result.current;
        this.city = result.timezone;
        this.daily = result.daily;
        this.currentIcon = result.current.weather[0].icon;
        this.todayIcon = result.daily[0].weather[0].icon;
        this.tomorrowIcon = result.daily[1].weather[0].icon;
        this.nextDayIcon = result.daily[2].weather[0].icon;
        this.cityDetail = {
          name: result.timezone,
          lat: result.lat,
          lon: result.lon,
          added: result.added,
        };
        this.time = result.current.dt;
        this.thirdDay = this.weatherService.getTime(result.daily[2].dt).day;
      },
      (err) => console.log('Error', err)
    );
    if (this.weatherService.weatherData) {
      this.weatherService.dispatchWeatherData();
    }
  }
  addCity(): void {
    this.cityDetail.added = true;
    this.weatherService.addCity({ ...this.cityDetail });
  }
  removeCity(): void {
    this.cityDetail.added = false;
    this.weatherService.removeCity({ ...this.cityDetail });
  }
  toggleSidebar(): void {
    this.uiSerivce.toggleSidebar();
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
    this.citySubscripton.unsubscribe();
  }
}
