// import { AutocompleteComponent } from './components/city.component';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template:  `
  <AutocompleteComponent></AutocompleteComponent>
  <app-weather></app-weather>
  <div></div>
  `
})
export class AppComponent {
  title = 'WeatherPWA';
}
