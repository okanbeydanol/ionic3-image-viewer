import { NgModule } from '@angular/core';
import { CoreGestureService } from './gesture';
import { CorePanDirective } from './pan';
import { CoreGestureTransitionService } from './gesture-transitions';
import { CorePressDirective } from './press';
import { CorePinchDirective } from './pinch';
import { CoreDoubleTapDirective } from './doubletap';
import { CoreSwipeDirective } from './swipe';
import { CoreTapDirective } from './tap';


@NgModule({
  declarations: [
    CorePanDirective,
    CorePressDirective,
    CorePinchDirective,
    CoreDoubleTapDirective,
    CoreSwipeDirective,
    CoreTapDirective
  ],
  imports: [],
  exports: [
    CorePanDirective,
    CorePressDirective,
    CorePinchDirective,
    CoreDoubleTapDirective,
    CoreSwipeDirective,
    CoreTapDirective
  ],
  providers: [
    CoreGestureService,
    CoreGestureTransitionService
  ],
})
export class InonicHammerGestureModule { }
