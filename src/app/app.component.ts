import { UIService } from './services/ui.service';
// import { AutocompleteComponent } from './components/city.component';
import { Component , ElementRef, OnInit, ViewChild} from '@angular/core';
import { WeatherService } from './services/weather.service';

@Component({
  selector: 'app-root',
  template:  `
  <AutocompleteComponent *ngIf="openSidebar" sideBar="openSidebar?true:false" ></AutocompleteComponent>
  <app-weather></app-weather>
  <div></div>
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
