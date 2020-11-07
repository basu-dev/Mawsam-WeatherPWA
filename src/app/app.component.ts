import { UIService } from './services/ui.service';
import {
  AfterViewInit,
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
})
export class AppComponent implements OnInit{
  constructor(private service: WeatherService, private uiService: UIService) {}
  public title = 'Mawsam | Weather';
  public openSidebar: boolean;
  @ViewChild('sideBar') sideBar: ElementRef;
  ngOnInit(): void {
    this.service.get({ lat: 32.34, lon: 23.23, name: 'Location' });
    this.service.getCities();
    this.uiService.sideBarSub.subscribe((x) => {
      this.openSidebar = x;
    });
  }

}
