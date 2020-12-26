import { environment } from './../../environments/environment';
import { WeatherService } from './weather.service';
import { Injectable } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { ModalService } from '../components/modal/modal.service';

@Injectable({providedIn: 'root'})
export class NotificationService {
    constructor(private swPush: SwPush,
      private modalService:ModalService,
      private weatherSerivce:WeatherService) { }
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
            .catch(e=>localStorage.setItem('notification','disabled'));
        }
        else{
          console.log("disabled")
        }
      }
      showDialog() {  
        let notif=localStorage.getItem('notification');
        if(notif && notif=="disabled" || notif=="enabled"){
          return;
        }
        const msg = "We want to send notifications each 4 hours to inform you about current weather conditions. Do you want to use it?"
        this.modalService.confirmThis(msg,  ()=> {  
          this.pushSubscription();
          localStorage.setItem('notification','enabled');
        }, ()=> {  
          localStorage.setItem("notification","disabled");
        })  
      } 
    
}