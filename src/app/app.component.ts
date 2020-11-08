
import { environment } from './../environments/environment';
import { UIService } from './services/ui.service';
import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { WeatherService } from './services/weather.service';


@Component({
  selector: 'app-root',
  template: `
    <app-cities></app-cities>
    <router-outlet></router-outlet>
    <app-weatherdetail></app-weatherdetail>
  `,
  styles: [`
   @media (max-width: 768px){
    app-weatherdetail{ 
      display: none;
    }
   }
  `]
})
export class AppComponent implements OnInit{
  constructor(private service: WeatherService, private uiService: UIService) {}
  public title = 'Mawsam | Weather';
  public openSidebar: boolean;
  @ViewChild('sideBar') sideBar: ElementRef;
  ngOnInit(): void {
    if(environment.production){

      this.service.getGeolocation();
    }
    else{

       this.service.get({ lat: 32.34, lon: 23.23, name: 'Location' });
    }
    this.service.getCities();
    this.uiService.sideBarSub.subscribe((x) => {
      this.openSidebar = x;
    });
  }

}
