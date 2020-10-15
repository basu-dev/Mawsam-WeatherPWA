import { Place } from './../model/weather';
import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Subscription } from 'rxjs';

import { WeatherService } from '../services/weather.service';
import { CurrentWeather, DailyWeather } from '../model/weather';

@Component({
  selector: 'app-weather',
  styleUrls: ['weather.component.css'],
  templateUrl: 'weather.component.html',
})
export class WeatherComponent implements OnInit, OnDestroy {
  constructor(public weatherService: WeatherService) {}
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
  ngOnInit(): void {
    this.citySubscripton = this.weatherService.citySub.subscribe((x: Place): void => {
    this.weatherService.get(x);
    });
    this.sub = this.weatherService.subject.subscribe(
      (result) => {
        console.log(result);
        this.weather = result.current;
        this.city = /.\/([aA-zZ]+)/.exec(result.timezone)[1];
        this.daily = result.daily;
        this.currentIcon = result.current.weather[0].icon;
        this.todayIcon = result.daily[0].weather[0].icon;
        this.tomorrowIcon = result.daily[1].weather[0].icon;
        this.nextDayIcon = result.daily[2].weather[0].icon;
      },
      (err) => console.log('Error', err)
    );
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
    this.citySubscripton.unsubscribe();
  }
}
