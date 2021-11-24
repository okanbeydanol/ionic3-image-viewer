import { InonicHammerGestureModule } from './../directives/directives.module';

import { NgModule, ModuleWithProviders, InjectionToken } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';

import { HttpClientModule } from '@angular/common/http';

import { ImageViewerComponent } from './image-viewer.component';
import { ImageViewerService } from './image-viewer.service';


import { ImageModalComponent } from './image/image-modal.component';
import { FormsModule } from '@angular/forms';


export interface LibConfig {
  apiUrl: string;
}
export const LibConfigService = new InjectionToken<LibConfig>('LibConfig');


@NgModule({
  declarations: [
    ImageViewerComponent,
    ImageModalComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    HttpClientModule,
    FormsModule,
    InonicHammerGestureModule
  ],
  exports: [
    ImageViewerComponent,
    ImageModalComponent
  ],
  entryComponents: [
    ImageViewerComponent,
    ImageModalComponent,
  ],
  providers: [
    ImageViewerService,
  ],
})
export class ImageViewerModule {
  static forRoot(config: LibConfig): ModuleWithProviders {
    return {
      ngModule: ImageViewerModule,
      providers: [
        {
          provide: LibConfigService,
          useValue: config,
        },
      ],
    };
  }
}
