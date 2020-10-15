import {
  Component,
  ViewChild,
  EventEmitter,
  Output,
  OnInit,
  AfterViewInit,
  Input,
} from '@angular/core';
import {} from 'googlemaps';
import { Place } from '../model/weather';
import { WeatherService } from '../services/weather.service';

@Component({
  selector: 'AutocompleteComponent',
  template: `
  <h4>Manage Cities</h4><br/>
    <input
      class="input"
      type="text"
      placeholder="Enter Location"
      [(ngModel)]="autocompleteInput"
      #addresstext
    />
    <city-detail *ngFor="let city of cities" [city]=city></city-detail>
  `,
  styles: [`
input{
    width:100%;
    border:none;
    border-radius:50px;
    background:#00000030;
    color:white;
    padding:10px 20px;
    outline:none;
    font-size:1.03rem;
}
input::placeholder{
    color:#ffffffa3;
}
  `]
})
export class AutocompleteComponent implements  AfterViewInit {
  @Input() adressType: string;
  @Output() setAddress: EventEmitter<any> = new EventEmitter();
  @ViewChild('addresstext') addresstext: any;

  autocompleteInput: string;
  queryWait: boolean;
  public cities: Place[] = [{
    name:'Kathmandu',
    temp: {
      min: 15,
      max: 23,
      current: 22
    }
  }]
  constructor(public service: WeatherService) {}
  ngAfterViewInit(): void {
    const a = this.service.getCity();
    this.service.citySub.next({...a});
    this.getPlaceAutocomplete();
  }
  private getPlaceAutocomplete(): void {
    const autocomplete = new google.maps.places.Autocomplete(
      this.addresstext.nativeElement,
      {
        types: [this.adressType], // 'establishment' / 'address' / 'geocode'
      }
    );
    google.maps.event.addListener(autocomplete, 'place_changed', () => {
      console.log(autocomplete);
      const place = autocomplete.getPlace();
    //   console.log(autocomplete.getPlace());
      this.codeAddress(place);
    });
  }

  invokeEvent(place: object): void {
    this.setAddress.emit(place);
  }
  codeAddress(place): void {
    const geocoder = new google.maps.Geocoder();
    console.log(place);
    const address = place.name;
    geocoder.geocode({ address }, (results, status): void => {
      if (status === google.maps.GeocoderStatus.OK) {
        const lat = results[0].geometry.location.lat();
        const lon = results[0].geometry.location.lng();
        const a: Place = {name: address, lat , lon };
        // console.log('Latitude: ' +);
        // console.log('Longitude: ' + );
        this.service.citySub.next({...a});
      } else {
        console.log('Geocode was not successful for the following reason: ' + status);
      }
    });
  }
}
