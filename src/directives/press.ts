import { Directive, ElementRef, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CoreGestureService } from './gesture';
import { HammerBuilder, HammerType, Events, HammerCallback } from '../public-api';

/**
 * Directive to add long press actions to html elements.
 */
@Directive({
  selector: '[press]'
})
export class CorePressDirective implements OnInit {

  @Input() transitionactive: boolean;
  @Output() pressChange: EventEmitter<any>;

  constructor(private el: ElementRef, private gestureService: CoreGestureService) {
    this.pressChange = new EventEmitter();
  }

  /**
   * Initialize gesture listening.
   */
  ngOnInit(): void {
    const hammerType: HammerType = 'press';
    const events: Events[] = []
    const hammer: HammerBuilder = {
      type: hammerType,
      events: events,
    }
    this.gestureService.handle(hammer, this.el.nativeElement, (hammer: HammerCallback) => {
      if (this.transitionactive) {
        //do stuff
      }
      this.pressChange.emit(hammer);
    });
    console.log('Press Directive Works', this.transitionactive);
  }
}
