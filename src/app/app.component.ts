
import { environment } from './../environments/environment';
import { UIService } from './services/ui.service';
import {
  Component,
  OnInit,
} from '@angular/core';
import { WeatherService } from './services/weather.service';


@Component({
  selector: 'app-root',
  template: `
    <app-cities [style.left]="openSidebar ? '0' : '-100%'"></app-cities>
    <router-outlet #outlet></router-outlet>
    <app-weatherdetail></app-weatherdetail>
        <div *ngIf="ui.loading" class="loadingview">
            <div class="loader">
                <span style="--j:1"></span>
                <span style="--j:2"></span>
                <span style="--j:3"></span>
            </div>
        </div>
  `,
  styles: [
    `
      @media (max-width: 768px) {
        app-weatherdetail {
          display: none;
        }
      }
    `,
  ],
})
export class AppComponent implements OnInit {
  constructor(private service: WeatherService, public ui: UIService) {}
  public title = 'Mawsam | Weather';
  public openSidebar: boolean;
  ngOnInit(): void {
    if (environment.production) {
      this.service.getGeolocation();
    } else {
      this.service.get({ lat: 32.34, lon: 23.23, name: 'Location' });
    }
    this.service.getCities();
    this.ui.sideBarSub.subscribe((x) => {
      this.openSidebar = x;
    });
  }
}
