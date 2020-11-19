import { UIService } from './../services/ui.service';
import { Subscription } from 'rxjs';
import {
  Component,
  AfterViewInit,
  OnInit,
} from '@angular/core';
import {} from 'googlemaps';
import { Place } from '../model/weather';
import { WeatherService } from '../services/weather.service';

@Component({
  selector: 'app-cities',
  template: `
    <h4>Manage Cities</h4>
    <br />
    <app-autocomplete></app-autocomplete>
    <app-citydetail
      *ngFor="let city of cities"
      (click)="loadWeather(city)"
      [city]="city"></app-citydetail>
  `
 
})
export class CityComponent implements AfterViewInit, OnInit {
  public citiesSub: Subscription;
  public cities: Place[];
  constructor(public service: WeatherService, public ui: UIService) {}
  ngOnInit(): void {
    this.citiesSub = this.service.cityUpdatedSub.subscribe(
      (cities: Place[]) => {
        this.cities = cities;
      }
    );
    // this.ui.openSidebar();
  }
  ngAfterViewInit(): void {
    this.service.getCities();
  }
  loadWeather(city: Place): void {
    this.service.citySub.next({ ...city });
    this.ui.closeSidebar();
  }
}
