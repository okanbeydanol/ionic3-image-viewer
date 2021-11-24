import { Component, Input, OnInit, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ModalController } from 'ionic-angular';
import { ImageModalComponent } from './image/image-modal.component';
@Component({
  selector: 'image-viewer',
  templateUrl: './image-viewer.html',
  styleUrls: ['./image-viewer.scss']
})
export class ImageViewerComponent implements OnInit {

  @Input('url') url: string;
  @Input('gesturesActive') gesturesActive: boolean = true;
  @Input('gestureEvents') gestureEvents = ['pan', 'pinch', 'doubletap'];

  safeUrl: any;
  constructor(private domSanitizer: DomSanitizer, private modalCtrl: ModalController) {}
  ngOnInit(): void {
  }
  getSanitizeUrl() {
    return this.domSanitizer.sanitize(SecurityContext.RESOURCE_URL, this.domSanitizer.bypassSecurityTrustResourceUrl(this.url));
  }

  async openImage() {
    const modal = await this.modalCtrl.create(
      ImageModalComponent,
      { media: this.url, gestureEvents: this.gesturesActive ? this.gestureEvents : [] }
    );
    await modal.present();
  }
}
