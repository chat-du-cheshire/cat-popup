import {TemplateRef, Type} from '@angular/core';
import {Subject} from 'rxjs';
import {OverlayRef} from '@angular/cdk/overlay';

export type PopupCloseEvent<T> = {
  type: 'backdropClick' | 'close';
  data: T;
};

export type PopupContent = TemplateRef<any> | Type<any> | string;

export class PopupRef<T = any> {
  private afterClosed = new Subject<PopupCloseEvent<T>>();
  afterClosed$ = this.afterClosed.asObservable();

  constructor(public overlay: OverlayRef, public content: PopupContent, public data: T) {
    overlay.backdropClick().subscribe(() => this._close('backdropClick', data));
  }

  close(data?: T) {
    this._close('close', data);
  }

  private _close(type, data) {
    this.overlay.dispose();
    this.afterClosed.next({
      type,
      data
    });
    this.afterClosed.complete();
  }
}
