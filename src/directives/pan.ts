import { Directive, ElementRef, OnInit, Output, EventEmitter, Input } from '@angular/core';
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
  @Output() panChange: EventEmitter<any>;

  constructor(private el: ElementRef, private gestureService: CoreGestureService, private transitionService: CoreGestureTransitionService) {
    this.panChange = new EventEmitter();
  }

  /**
   * Initialize gesture listening.
   */
  private hammer: HammerCallback = null;
  ngOnInit(): void {
    const hammerType: HammerType = 'pan';
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
        this.transitionService.panTransition(hammer);
      }
      this.panChange.emit(hammer);
    });
    console.log('Pan Directive Works', this.transitionactive);
  }
  mcDestroy() {
    if (this.hammer !== null) {
      this.gestureService.mcDestroy(this.hammer);
    }
  }
}
