import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class UIService {
    constructor() { }
public sideBarSub = new Subject<any>();
    
}