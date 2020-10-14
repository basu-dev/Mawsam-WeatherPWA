// import { AutocompleteComponent } from './components/city.component';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template:  `
  <app-weather></app-weather>
  <!-- <AutocompleteComponent></AutocompleteComponent> -->
  `
})
export class AppComponent {
  title = 'WeatherPWA';
}
