import { Component, Input, OnInit } from '@angular/core';  
import { ModalService } from './modal.service';  
  
@Component({  
    selector: 'app-modal',  
    templateUrl:'modal.component.html',  
    styleUrls: ['modal.component.css']  
})  
  
export class ModalComponent implements OnInit {  
    message: any;  
    constructor(  
        private confirmDialogService: ModalService  
    ) { }  
  
    ngOnInit(): any {  
       /** 
        *   This function waits for a message from alert service, it gets 
        *   triggered when we call this from any other component 
        */  
        this.confirmDialogService.getMessage().subscribe(message => {  
            this.message = message;  
        });  
    }  
}  