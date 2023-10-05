import {Directive, ElementRef, HostListener} from '@angular/core';

@Directive({
  selector: '[fieldStyle]'
})
export class FieldDirective {

  constructor(protected el: ElementRef) {
    el.nativeElement.style.backgroundColor = '#ffffff';
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.setStyle('#f1f5f3');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.setStyle(null);
  }

  private setStyle(color: any) {
    this.el.nativeElement.style.backgroundColor = color;
  }

}
