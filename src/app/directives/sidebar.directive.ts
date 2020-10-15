import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[sideBar]',
})
export class SideBarDirective {
  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
      this.renderer.setStyle(this.elementRef.nativeElement, 'left', '0');
      this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', 'grey');
      this.renderer.setStyle(this.elementRef.nativeElement, 'width', '100vw');
      this.renderer.setStyle(this.elementRef.nativeElement, 'z-index', '100');
  }
}

