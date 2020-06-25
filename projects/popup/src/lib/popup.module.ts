import { NgModule } from '@angular/core';
import {OverlayModule} from '@angular/cdk/overlay';
import { PopupComponent } from './components/popup/popup.component';
import {PopupService} from './services/popup.service';
import { PopupDirective } from './directives/popup.directive';
import {CommonModule} from '@angular/common';



@NgModule({
  declarations: [PopupComponent, PopupDirective],
  providers: [PopupService],
  imports: [
    OverlayModule,
    CommonModule
  ],
  exports: [PopupDirective]
})
export class PopupModule { }
