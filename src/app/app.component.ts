// import { AutocompleteComponent } from './components/city.component';
import { Component , OnInit} from '@angular/core';
import { WeatherService } from './services/weather.service';

@Component({
  selector: 'app-root',
  template:  `
  <AutocompleteComponent></AutocompleteComponent>
  <app-weather></app-weather>
  <div></div>
  `
})
export class AppComponent implements OnInit{
  constructor(private service: WeatherService){}
  ngOnInit(): void{
    this.service.getCities();
  }
  public title = 'Mawsam';
}
