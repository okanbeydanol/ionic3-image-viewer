import { Directive, ElementRef, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { HammerBuilder, HammerType, Events, HammerCallback } from '../public-api';
import { CoreGestureService } from './gesture';
/**
 * Directive to add long press actions to html elements.
 */
@Directive({
  selector: '[tap]'
})
export class CoreTapDirective implements OnInit {

  @Input() transitionactive: boolean;
  @Output() tapChange: EventEmitter<any>;

  constructor(private el: ElementRef, private gestureService: CoreGestureService) {
    this.tapChange = new EventEmitter();
  }

  /**
   * Initialize gesture listening.
   */
  ngOnInit(): void {
    const hammerType: HammerType = 'tap';
    const events: Events[] = []
    const hammer: HammerBuilder = {
      type: hammerType,
      events: events,
    }
    this.gestureService.handle(hammer, this.el.nativeElement, (hammer: HammerCallback) => {
      if (this.transitionactive) {
        //Do stuff
      }
      this.tapChange.emit(hammer);
    });
    console.log('Tap Directive Works', this.transitionactive);
  }
}
