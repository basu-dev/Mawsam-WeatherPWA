import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { WeatherService } from '../services/weather.service';
import { CurrentWeather, DailyWeather } from '../model/weather';

@Component({
  selector: 'app-weather',
  styleUrls: ['weather.component.css'],
  templateUrl: 'weather.component.html',
})
export class WeatherComponent implements OnInit {
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
  ngOnInit(): void {
    this.placeholder =
      localStorage.getItem('city') != null
        ? 'Change Default City'
        : 'Choose Default City';
    setTimeout((_) => {
      this.getApi(localStorage.getItem('city'));
    });
  }

  getApi(city: string): void {
    this.weatherService.get(city).subscribe(
      (result) => {
        console.log(result);
        this.weather = result.current;
        this.city = /.\/([aA-zZ]+)/.exec(result.timezone)[1];
        this.daily = result.daily;
        this.currentIcon = result.current.weather[0].icon;
        this.todayIcon = result.daily[0].weather[0].icon;
        this.tomorrowIcon = result.daily[1].weather[0].icon;
        this.nextDayIcon = result.daily[2].weather[0].icon;
        console.log(this.tomorrowIcon);
        console.log(this.city);
      },
      (err) => console.log('Error', err)
    );
  }
  search(e): void {
    console.log(e);
    if (e.key === 'Enter') {
      this.getApi(e.target.value);
    }
  }
  defaultCity(): void {
    localStorage.setItem('city', this.default.nativeElement.value);
    this.getApi(this.default.nativeElement.value);
  }
}
