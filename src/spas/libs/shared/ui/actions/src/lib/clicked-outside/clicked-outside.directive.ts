import { Directive, ElementRef, Output, HostListener, EventEmitter } from '@angular/core';

@Directive({
  selector: '[uiActionClickedOutside]'
})
export class ClickedOutsideDirective {

  constructor(private elementRef: ElementRef) { }

  @Output()
  public uiActionClickedOutside = new EventEmitter<MouseEvent>();

  @HostListener('document:click', ['$event', '$event.target'])
  public onClick(event: MouseEvent, targetElement: HTMLElement) {
    if (!targetElement) {
      return;
    }

    const clickedInside = this.elementRef.nativeElement.contains(targetElement);

    if (!clickedInside) {
      this.uiActionClickedOutside.emit(event);
    }
  }
}
