import { environment } from './../../environments/environment';
import { WeatherService } from './weather.service';
import { Injectable } from '@angular/core';
import { SwPush } from '@angular/service-worker';

@Injectable({providedIn: 'root'})
export class NotificationService {
    constructor(private swPush: SwPush,private weatherSerivce:WeatherService) { }
    getLocation():any{
        return new Promise((resolve,error)=>{
            navigator.geolocation.getCurrentPosition(res=>{
                resolve({
                    lat:res.coords.latitude,
                    lon:res.coords.longitude
                })
            },
            err=>{
                resolve(JSON.parse(localStorage.getItem('default')))
            }
            )
        })
    }
    async pushSubscription(): Promise<any> {
        if (this.swPush.isEnabled) {
        let position = await this.getLocation();
          this.swPush
            .requestSubscription({ serverPublicKey: environment.webpushPublicKey })
            .then(
              (sub) =>
              {
                let body={
                    sub,
                    lat:position.lat,
                    lon:position.lon
                }
                fetch(environment.serverUrl+'/subscription',{
                  method:'POST',
                  body: JSON.stringify(body),
                  headers:{
                    'Content-Type': 'application/json'
                  }
                }
                ).then(data=>data.json()).then(res=>console.log(JSON.stringify(res)))
              }
            )
            .catch(console.error);
        }
      }
    
}