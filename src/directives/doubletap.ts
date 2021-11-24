import { Directive, ElementRef, OnInit, Output, EventEmitter, Input } from '@angular/core';
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
  @Output() doubletapChange: EventEmitter<any>;
  constructor(private el: ElementRef, private gestureService: CoreGestureService, private transitionService: CoreGestureTransitionService) {
    this.doubletapChange = new EventEmitter();
  }

  /**
   * Initialize gesture listening.
   */
  
  private hammer: HammerCallback = null;
  ngOnInit(): void {
    const hammerType: HammerType = 'doubletap';
    const events: Events[] = []
    const hammer: HammerBuilder = {
      type: hammerType,
      events: events,
    }

    this.gestureService.handle(hammer, this.el.nativeElement, (hammer: HammerCallback) => {
      if (this.hammer === null) {
        this.hammer = hammer;
      }
      if (this.transitionactive) {
        this.transitionService.doubletapTransition(hammer);
      }
      this.doubletapChange.emit(hammer);
    });
    console.log('DoubleTap Directive Works', this.transitionactive);
  }
}
