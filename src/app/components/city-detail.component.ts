import { Component, OnInit, Input } from '@angular/core';
import { Place } from '../model/weather';

@Component({
    selector: 'city-detail',
    template: `
         <div class="grid">
        <div class="updown-grid">
          <h3>{{city.name}}</h3>
          <small>{{city.temp.max}}&deg; / {{city.temp.min}}&deg;</small>
        </div>
        <div class="temp">{{city.temp.current}}&deg;</div>
      </div>
    `,
    styles: [`
.grid{
    cursor:pointer;
    margin-top:10px;
    padding:10px 20px;
    text-align: left;
    height:70px;
    width:100%;
    background:#0000009e;
    border-radius:10px;
    align-items: center;
    display:grid;
    grid-template-columns: 4fr 1fr;
}
.temp{
    font-size:30px;
}
    `]
})

export class CityDetailComponent implements OnInit {
    @Input('city') public city: Place;

    constructor() { }

    ngOnInit() { 
        console.log(this.city.name);
    }
}
