import { Directive, ElementRef, OnInit, Input } from '@angular/core';
import { HammerBuilder, HammerType, Events, HammerCallback } from '../public-api';
import { CoreGestureService } from './gesture';
import { CoreGestureTransitionService } from './gesture-transitions';

/**
 * Directive to add long press actions to html elements.
 */
@Directive({
  selector: '[doubletap]'
})
export class CoreDoubleTapDirective implements OnInit {

  @Input() transitionactive: boolean;

  constructor(private el: ElementRef, private gestureService: CoreGestureService, private transitionService: CoreGestureTransitionService) {
  }

  /**
   * Initialize gesture listening.
   */
  
  ngOnInit(): void {
    const hammerType: HammerType = 'doubletap';
    const events: Events[] = []
    const hammer: HammerBuilder = {
      type: hammerType,
      events: events,
    }

    this.gestureService.handle(hammer, this.el.nativeElement, (hammer: HammerCallback) => {
      if (this.transitionactive) {
        this.transitionService.doubletapTransition(hammer);
      }
    });
    console.log('DoubleTap Directive Works', this.transitionactive);
  }
}
