import { Component, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Platform, NavController, NavParams, ViewController } from 'ionic-angular';

@Component({
  selector: 'dev-image',
  templateUrl: './image-modal.component.html',
  styleUrls: ['./image-modal.component.scss'],

})
export class ImageModalComponent {

  public media: any;
  public src: any;
  mediaLoaded = false;
  constructor(
    public platform: Platform,
    public navCtrl: NavController,
    public viewCtrl: ViewController,
    private navParams: NavParams,
    private domSanitizer: DomSanitizer,
  ) {
    this.media = this.navParams.get("media");
    this.src = this.domSanitizer.bypassSecurityTrustUrl(this.media);
  }
  /* close modal */
  closeModal() {
    this.viewCtrl.dismiss();
  }

}