import { PartialWeather } from './../model/weather';
import { Component, OnInit, Input } from '@angular/core';
import { Place } from '../model/weather';
import { WeatherService } from '../services/weather.service';

@Component({
  selector: 'city-detail',
  template: `
    <div class="grid" *ngIf="city.temp">
      <div class="updown-grid">
        <h4>{{ city.name }}</h4>
        <small
          >{{ city.temp.max_temp }}&deg; / {{ city.temp.min_temp }}&deg;</small
        >
      </div>
      <div class="temp">{{ city.temp.current }}&deg;</div>
    </div>
  `,
  styles: [
    `
      .grid {
        cursor: pointer;
        margin-top: 10px;
        padding: 10px 20px;
        text-align: left;
        height: 60px;
        width: 100%;
        background: #0000009e;
        border-radius: 10px;
        align-items: center;
        display: grid;
        grid-template-columns: 4fr 1fr;
      }
      .temp {
        font-size: 25px;
      }
    `,
  ],
})
export class CityDetailComponent implements OnInit {
  @Input() public city: Place;
  constructor(private service: WeatherService) {}
  ngOnInit(): void {
    this.service.getCurrentWeather(this.city).subscribe((x: PartialWeather) => {
      this.city.temp = x;
    });
  }
}
