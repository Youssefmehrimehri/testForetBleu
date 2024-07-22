/* tslint:disable */
import {Directive, ElementRef} from '@angular/core';

@Directive({
  selector: '[appOutside]',
  host: {
    '(document:click)': 'onClick($event)',
  }
})
export class OutsideDirective {

  constructor(private elementRef: ElementRef) { }

  onClick(event) {
    if (!this.elementRef.nativeElement.contains(event.target)) // or some similar check
       console.log("")

  }

}
