import { NgModule } from '@angular/core';
import { CoreGestureService } from './gesture';
import { CorePanDirective } from './pan';
import { CoreGestureTransitionService } from './gesture-transitions';
import { CorePinchDirective } from './pinch';
import { CoreDoubleTapDirective } from './doubletap';


@NgModule({
  declarations: [
    CorePanDirective,
    CorePinchDirective,
    CoreDoubleTapDirective,
  ],
  imports: [],
  exports: [
    CorePanDirective,
    CorePinchDirective,
    CoreDoubleTapDirective,
  ],
  providers: [
    CoreGestureService,
    CoreGestureTransitionService
  ],
})
export class InonicHammerGestureModule { }
