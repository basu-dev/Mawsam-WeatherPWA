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

@Component({
  selector: 'AutocompleteComponent',
  template: `
    <input
      class="input"
      type="text"
      [(ngModel)]="autocompleteInput"
      #addresstext
      style="padding: 12px 20px; border: 1px solid #ccc; width: 400px"
    />
  `,
})
export class AutocompleteComponent implements OnInit, AfterViewInit {
  @Input() adressType: string;
  @Output() setAddress: EventEmitter<any> = new EventEmitter();
  @ViewChild('addresstext') addresstext: any;

  autocompleteInput: string;
  queryWait: boolean;

  constructor() {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.getPlaceAutocomplete();
  }

  private getPlaceAutocomplete() {
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

  invokeEvent(place: Object) {
    this.setAddress.emit(place);
  }
  codeAddress(place): void {
    const geocoder = new google.maps.Geocoder();
    console.log(place);
    const address = place.name;
    geocoder.geocode({ address }, (results, status): void => {
      if (status === google.maps.GeocoderStatus.OK) {
        console.log('Latitude: ' + results[0].geometry.location.lat());
        console.log('Longitude: ' + results[0].geometry.location.lng());
      } else {
        console.log('Geocode was not successful for the following reason: ' + status);
      }
    });
  }
}
