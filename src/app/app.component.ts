import { UIService } from './services/ui.service';
import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { WeatherService } from './services/weather.service';

@Component({
  selector: 'app-root',
  template:  `
  <app-cities></app-cities>
  <router-outlet></router-outlet>
  <app-weatherdetail></app-weatherdetail>
  `
})
export class AppComponent implements OnInit, AfterViewInit{
  constructor(private service: WeatherService,
              private uiService: UIService
    ){}
  public title = 'Mawsam | Weather';
  public openSidebar: boolean;
  @ViewChild('sideBar') sideBar: ElementRef;
  ngOnInit(): void{
    // this.service.getGeolocation();
    // the line below should be replaced with aboove line whilest onilne
    this.service.get({ lat: 32.34, lon: 23.23, name: 'Location' });
    this.service.getCities();
    this.uiService.sideBarSub.subscribe(x=>{
      this.openSidebar = x;
    })
  }
  ngAfterViewInit(): void{
    console.log("view Init App")
    // this.service.getGeolocation();
  }
}
