import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {OverlayModule} from '@angular/cdk/overlay';
import {MyComponent} from './components/my/my.component';
import {PopupModule} from '../../projects/popup/src/lib/popup.module';

@NgModule({
  declarations: [
    AppComponent,
    MyComponent
  ],
  imports: [
    BrowserModule,
    OverlayModule,
    PopupModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
