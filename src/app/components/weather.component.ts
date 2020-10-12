import { Component, ElementRef, OnInit,ViewChild } from '@angular/core';
import { WeatherService } from '../services/weather.service';

@Component({
    selector: 'selector-weather',
    template: `
        <div>
            <input type="text" (keyup)="search(this.$event)" placeholder="Enter City Name" (value)="city" required>
            <div class="details">
                <div *ngIf="weather; else elseBlock" >
                    <h1>{{weather.name}}</h1>
                    <h3>Condition: {{weather.description}}</h3>
                    Temperature: {{weather.temp}} C <br>
                    Humidity:{{weather.humidity}}<br>
                    Pressure: {{weather.pressure}} Pa<br>
                    Min. Temp: {{weather.min_temp}} C<br>
                    Max. Temp: {{weather.max_temp}} C<br>
                </div> 
                <ng-template #elseBlock> Enter Valid City Name </ng-template>
            </div><br><br>
            <input type="text" #default [placeholder]="placeholder"><button (click)="defaultCity()">Save</button>
        </div>
    `
})
export class WeatherComponent implements OnInit {
    constructor(public weatherService:WeatherService) { }
    @ViewChild('default') default: ElementRef;
    public placeholder:string="";
    ngOnInit() {

        // this.weatherService.get('Wednedsay').subscribe(
        //     result=>console.log(result),
        //     err=>console.log(err)
        // )
         this.placeholder=localStorage.getItem('city')!=null?'Change Default City':"Choose Default City";
        setTimeout(_=>{
            this.getApi(localStorage.getItem('city'));
        })
     }
    
     public city:string;
     public weather=null;

     getApi(city){
        this.weatherService.get(city).subscribe(
            result=>{
                console.log(result);
                this.weather=result;
                this.city=""
            },
            err=>console.log(err)
        )
     }
     search(e){
         console.log(e);
         if(e.key=='Enter'){
             this.getApi(e.target.value)
         }

     }
     defaultCity(){
         localStorage.setItem('city',this.default.nativeElement.value);
         this.getApi(this.default.nativeElement.value);
     }
}