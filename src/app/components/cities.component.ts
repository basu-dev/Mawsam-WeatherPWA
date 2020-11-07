import { Subscription } from 'rxjs';
import {
  Component,
  ViewChild,
  EventEmitter,
  Output,
  AfterViewInit,
  Input,
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
    <input
      class="input"
      type="text"
      placeholder="Enter Location"
      [(ngModel)]="autocompleteInput"
      #addresstext
    />
    <app-citydetail
      *ngFor="let city of cities"
      (click)="loadWeather(city)"
      [city]="city"></app-citydetail>
  `,
  styles: [
    `
      input {
        width: 100%;
        border: none;
        border-radius: 50px;
        background: #00000030;
        padding: 10px 20px;
        outline: none;
        font-size: 1.03rem;
      }
      input::placeholder {
        color: #ffffffa3;
      }
    `,
  ],
})
export class CityComponent implements AfterViewInit, OnInit {
  @Input() adressType: string;
  @Output() setAddress: EventEmitter<any> = new EventEmitter();
  @ViewChild('addresstext') addresstext: any;

  autocompleteInput: string;
  queryWait: boolean;
  public citiesSub: Subscription;
  public cities: Place[];
  constructor(public service: WeatherService) {}
  ngOnInit(): void {
    this.citiesSub = this.service.cityUpdatedSub.subscribe(
      (cities: Place[]) => {
        this.cities = cities;
      }
    );
  }
  ngAfterViewInit(): void {
    this.service.getCities();
    this.getPlaceAutocomplete();
  }
  loadWeather(city: Place): void {
    this.service.citySub.next({ ...city });
  }
  private getPlaceAutocomplete(): void {
    const autocomplete = new google.maps.places.Autocomplete(
      this.addresstext.nativeElement,
      {
        types: [this.adressType], // 'establishment' / 'address' / 'geocode'
      }
    );
    google.maps.event.addListener(autocomplete, 'place_changed', () => {
      const place = autocomplete.getPlace();
      this.codeAddress(place);
    });
  }

  invokeEvent(place: object): void {
    this.setAddress.emit(place);
  }
  codeAddress(place): void {
    const geocoder = new google.maps.Geocoder();
    const address = place.name;
    geocoder.geocode({ address }, (results, status): void => {
      if (status === google.maps.GeocoderStatus.OK) {
        const lat = results[0].geometry.location.lat();
        const lon = results[0].geometry.location.lng();
        const a: Place = {
          name: address,
          lat,
          lon,
          temp: { min_temp: 0, max_temp: 0, current: 0 },
        };
        this.service.citySub.next({ ...a });
      } else {
        console.log(
          'Geocode was not successful for the following reason: ' + status
        );
      }
    });
  }
}
