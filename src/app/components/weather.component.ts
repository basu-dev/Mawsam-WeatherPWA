import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { WeatherService } from '../services/weather.service';
import { Weather } from './model/weather';

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
  public weather: Weather;
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
        this.city = '';
      },
      (err) => console.log(err)
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
