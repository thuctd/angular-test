import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[animate]',
})
export class AniamteDirective {
  @Input('animate') myVariable: string;
  private isElementVisible = false;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  private checkIfElementInView(): boolean {
    const element = this.elementRef.nativeElement;
    const elementPosition = element.getBoundingClientRect();
    const screenHeight = window.innerHeight;

    return elementPosition.top < screenHeight && elementPosition.bottom >= 0;
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const isVisible = this.checkIfElementInView();

    if (isVisible !== this.isElementVisible) {
      this.isElementVisible = isVisible;

      if (isVisible) {
        // Element is scrolled into view
        console.log(this.myVariable);
        this.renderer.addClass(this.elementRef.nativeElement, this.myVariable);
      } else {
        // Element is scrolled out of view
        console.log(this.myVariable);

        this.renderer.removeClass(
          this.elementRef.nativeElement,
          this.myVariable
        );
      }
    }
  }
}
