import { Component, ElementRef, SecurityContext, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Platform, NavController, NavParams, ViewController } from 'ionic-angular';
import { CoreDoubleTapDirective } from '../../directives/doubletap';
import { CoreGestureService } from '../../directives/gesture';
import { CoreGestureTransitionService } from '../../directives/gesture-transitions';
import { CorePanDirective } from '../../directives/pan';
import { CorePinchDirective } from '../../directives/pinch';
import { CorePressDirective } from '../../directives/press';
import { CoreSwipeDirective } from '../../directives/swipe';
import { CoreTapDirective } from '../../directives/tap';

@Component({
  selector: 'dev-image',
  templateUrl: './image-modal.component.html',
  styleUrls: ['./image-modal.component.scss'],

})
export class ImageModalComponent {

  @ViewChild('image') image: ElementRef;

  public media: any;
  public src: any;
  mediaLoaded = false;
  gestureEvents;
  private panComponent: CorePanDirective;
  private pinchComponent: CorePinchDirective;
  private tapComponent: CoreTapDirective;
  private doubletapComponent: CoreDoubleTapDirective;
  private pressComponent: CorePressDirective;
  private swipeComponent: CoreSwipeDirective;
  constructor(
    public platform: Platform,
    public navCtrl: NavController,
    public viewCtrl: ViewController,
    private navParams: NavParams,
    private transitionService: CoreGestureTransitionService,
    private domSanitizer: DomSanitizer,
    private gestureService: CoreGestureService
  ) {
    this.media = this.navParams.get("media");
    this.gestureEvents = this.navParams.get("gestureEvents");
    this.src = this.domSanitizer.sanitize(SecurityContext.RESOURCE_URL, this.domSanitizer.bypassSecurityTrustResourceUrl(this.media));

  }
  ionViewDidLoad() {
    setTimeout(() => {
      this.mediaLoaded = true;
      this.gestureEvents.forEach(event => {
        if (event === 'pan') {
          this.panComponent = new CorePanDirective(this.image, this.gestureService, this.transitionService);
          this.panComponent.transitionactive = true;
          this.panComponent.ngOnInit();
        }
        if (event === 'pinch') {
          this.pinchComponent = new CorePinchDirective(this.image, this.gestureService, this.transitionService);
          this.pinchComponent.transitionactive = true;
          this.pinchComponent.ngOnInit();
        }
        if (event === 'tap') {
          this.tapComponent = new CoreTapDirective(this.image, this.gestureService);
          this.tapComponent.ngOnInit();
        }
        if (event === 'doubletap') {
          this.doubletapComponent = new CoreDoubleTapDirective(this.image, this.gestureService, this.transitionService);
          this.doubletapComponent.transitionactive = true;
          this.doubletapComponent.ngOnInit();
        }
        if (event === 'press') {
          this.pressComponent = new CorePressDirective(this.image, this.gestureService);
          this.pressComponent.ngOnInit();
        }
        if (event === 'swipe') {
          this.swipeComponent = new CoreSwipeDirective(this.image, this.gestureService);
          this.swipeComponent.ngOnInit();
        }
      });
    }, 200);
  }
  /* close modal */
  closeModal() {
    this.panComponent && this.panComponent.mcDestroy();
    this.swipeComponent && this.swipeComponent.mcDestroy();
    this.viewCtrl.dismiss();
  }

}