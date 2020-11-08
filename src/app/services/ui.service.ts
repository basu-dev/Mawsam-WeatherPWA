import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UIService {
  constructor() {}
  public sideBarOpened = false;
  public sideBarSub = new Subject<boolean>();
  public loadingSub = new Subject<boolean>();
  public loading = true;
  public hourlyButtonSub = new Subject<boolean>();
  public toggleSidebar(shouldOpen?: boolean): void {
    this.sideBarOpened = shouldOpen ? shouldOpen : !this.sideBarOpened;
    this.sideBarSub.next(this.sideBarOpened);
  }
  public toggleLoading(shouldLoad?: boolean): void{
      this.loading = shouldLoad?shouldLoad:!this.loading;
  }
}
