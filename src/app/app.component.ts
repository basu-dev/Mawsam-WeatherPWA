import { UIService } from './services/ui.service';
import { Component , ElementRef, OnInit, ViewChild} from '@angular/core';
import { WeatherService } from './services/weather.service';

@Component({
  selector: 'app-root',
  template:  `
  <app-cities ></app-cities>
  <app-weather></app-weather>
  <app-weather-detail></app-weather-detail>
  `
})
export class AppComponent implements OnInit{
  constructor(private service: WeatherService,
              private uiService: UIService
    ){}
  public openSidebar:boolean;
  @ViewChild('sideBar') sideBar: ElementRef;
  ngOnInit(): void{
    this.service.getCities();
    this.uiService.sideBarSub.subscribe(x=>{
      this.openSidebar = x;
    })
  }
  public title = 'Mawsam';
}
