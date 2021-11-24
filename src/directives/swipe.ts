import { Directive, ElementRef, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CoreGestureService } from './gesture';
import { HammerBuilder, HammerType, Events, HammerCallback } from '../public-api';
/**
 * Directive to add swipe actions to html elements.
 */
@Directive({
  selector: '[swipe]'
})
export class CoreSwipeDirective implements OnInit {

  @Input() transitionactive: boolean;
  @Output() swipeChange: EventEmitter<any>;

  constructor(private el: ElementRef, private gestureService: CoreGestureService) {
    this.swipeChange = new EventEmitter();
  }

  /**
   * Initialize gesture listening.
   */
  private hammer: HammerCallback = null;
  ngOnInit(): void {
    const hammerType: HammerType = 'swipe';
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
        //do stuff
      }
      this.swipeChange.emit(hammer);
    });
    console.log('Swipe Directive Works', this.transitionactive);
  }

  mcDestroy() {
    if (this.hammer !== null) {
      const findIndex = this.hammer.hammerManagerInfo.findIndex(o => o.type === 'swipe');
      if (findIndex !== -1) {
        this.hammer.hammerManagerInfo[findIndex].manager.destroy();
        this.hammer.hammerManagerInfo.splice(findIndex, 1);
      }
    }
  }
}
