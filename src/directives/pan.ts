import { Directive, ElementRef, OnInit, Input } from '@angular/core';
import { HammerBuilder, HammerType, Events, HammerCallback } from '../public-api';
import { CoreGestureService } from './gesture';
import { CoreGestureTransitionService } from './gesture-transitions';

/**
 * Directive to add long press actions to html elements.
 */
@Directive({
  selector: '[pan]'
})
export class CorePanDirective implements OnInit {

  @Input() transitionactive: boolean;

  constructor(private el: ElementRef, private gestureService: CoreGestureService, private transitionService: CoreGestureTransitionService) {
  }

  /**
   * Initialize gesture listening.
   */
  ngOnInit(): void {
    const hammerType: HammerType = 'pan';
    const events: Events[] = []
    const hammer: HammerBuilder = {
      type: hammerType,
      events: events,
    }
    this.gestureService.handle(hammer, this.el.nativeElement, (hammer: HammerCallback) => {
      if (this.transitionactive) {
        this.transitionService.panTransition(hammer);
      }
    });
    console.log('Pan Directive Works', this.transitionactive);
  }

}
