import { WeatherService } from 'src/app/services/weather.service';
import { UIService } from './../services/ui.service';
import { AfterViewInit, Component, Input, TemplateRef, ViewChild } from '@angular/core';
import { Place } from '../model/weather';

@Component({
  selector: 'app-autocomplete',
  template: `
    <input
      class="input"
      type="text"
      placeholder="Enter Location"
      [(ngModel)]="autocompleteInput"
      #addresstext
    />
  `,
  styles: [
    `
      input {
        width: 100%;
        border: none;
        border-radius: 50px;
        background: #4380b3;
        padding: 10px 20px;
        outline: none;
        font-size: 1.03rem;
        color: white;
        letter-spacing: 1px;
      }
      input::placeholder {
        color: #ffffffa3;
      }
    `,
  ],
})
export class AutoCompleteComponent implements AfterViewInit{
  @ViewChild('addresstext') addresstext;
  @Input() adressType: string;
  @Input() type: string;
  autocompleteInput: string;
  ngAfterViewInit(): void {
    this.getPlaceAutocomplete();
  }
  constructor(public ui: UIService, public service: WeatherService) {}
  private getPlaceAutocomplete(): void {
    const autocomplete = new google.maps.places.Autocomplete(
      this.addresstext.nativeElement,
      {
        types: [this.adressType], // 'establishment' / 'address' / 'geocode'
      }
    );
    google.maps.event.addListener(autocomplete, 'place_changed', () => {
      const place = autocomplete.getPlace();
      this.addresstext.nativeElement.focus();
      this.codeAddress(place);
    });
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
        this.ui.closeSidebar();
        console.log(this.type);
        if (this.type && this.type === 'appcomponent'){
            this.service.setDefaultCity(address, lat, lon);
        }
        this.ui.hideModal();
      } else {
        console.log(
          'Geocode was not successful for the following reason: ' + status
        );
      }
    });
  }
}
