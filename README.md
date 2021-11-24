# ionic3-image-viewer
A simple international telephone number input. Allows you to create a phone number field with country dropdown. 


## Installation

To install this library, run:

```bash
$ npm install ionic3-image-viewer --save
```

## Consuming your library

Once you have installed it you can import `ImageViewerModule` from `ionic3-image-viewer` in any application module. E.g.

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

// Import your library
import { ImageViewerModule } from 'ionic3-image-viewer';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,

    // ImageViewerModule module
    ImageViewerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

Once it is imported, you can use `<image-viewer></image-viewer>`:

```xml
<!-- app.component.html -->
<image-viewer url="https://...."></image-viewer>
```
## License

MIT