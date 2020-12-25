import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UIService {
  constructor() {}
  public sideBarOpened = false;
  public loading = true;
  public isBrowserMode = true;
  public sideBarSub = new Subject<boolean>();
  public loadingSub = new Subject<boolean>();
  public hourlyButtonSub = new Subject<boolean>();
  public defaultLocationModalSub = new Subject<boolean>();
  public toggleSidebar(shouldOpen?: boolean): void {
    this.sideBarOpened = shouldOpen ? shouldOpen : !this.sideBarOpened;
    this.sideBarSub.next(this.sideBarOpened);
  }
  public openSidebar(): void {
    this.sideBarOpened = true;
    this.sideBarSub.next(true);
  }
  public closeSidebar(): void {
    this.sideBarOpened = false;
    this.sideBarSub.next(false);
  }
  public toggleLoading(shouldLoad?: boolean): void {
    this.loading = shouldLoad ? shouldLoad : !this.loading;
  }
  public showModal(): void{
    console.log('running')
    this.defaultLocationModalSub.next(true);
  }
  public hideModal(): void{
    this.defaultLocationModalSub.next(false);
  }
}
