import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[fade]',
})
export class ScrollIntoViewDirective {
  @Input('fade') myVariable: string;
  private isElementVisible = false;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  private checkIfElementInView(): boolean {
    const element = this.elementRef.nativeElement;
    const elementPosition = element.getBoundingClientRect();
    const screenHeight = window.innerHeight;

    return (
      elementPosition.top + 80 < screenHeight && elementPosition.bottom >= 0
    );
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const isVisible = this.checkIfElementInView();

    if (isVisible !== this.isElementVisible) {
      this.isElementVisible = isVisible;

      if (isVisible) {
        // Element is scrolled into view

        this.renderer.addClass(this.elementRef.nativeElement, this.myVariable);
      } else {
        // Element is scrolled out of view

        this.renderer.removeClass(
          this.elementRef.nativeElement,
          this.myVariable
        );
      }
    }
  }
}
