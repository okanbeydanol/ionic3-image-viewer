import { Directive, ElementRef, OnInit, Input } from '@angular/core';
import { CoreGestureService } from "./gesture";
import { HammerBuilder, HammerType, Events, HammerCallback } from "../public-api";
import { CoreGestureTransitionService } from './gesture-transitions';

/**
 * Directive to add long press actions to html elements.
 */
@Directive({
  selector: '[pinch]'
})
export class CorePinchDirective implements OnInit {

  @Input() transitionactive: boolean;

  private hammer: HammerCallback = null;

  constructor(private el: ElementRef, private gestureService: CoreGestureService, private transitionService: CoreGestureTransitionService) {
  }

  /**
   * Initialize gesture listening.
   */
  ngOnInit(): void {
    const hammerType: HammerType = 'pinch';
    const events: Events[] = []
    const hammer: HammerBuilder = {
      type: hammerType,
      events: events,
    }
    this.gestureService.handle(hammer, this.el.nativeElement, (hammer: HammerCallback) => {
      if (this.transitionactive) {
        this.transitionService.pinchTransition(hammer);
      }
    });
    console.log('Pinch Directive Works', this.transitionactive);
  }
}
