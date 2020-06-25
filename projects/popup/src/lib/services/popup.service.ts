import {Inject, Injectable, Injector} from '@angular/core';
import {Overlay, OverlayConfig, PositionStrategy, ConnectionPositionPair} from '@angular/cdk/overlay';
import {PopupContent, PopupRef} from '../utils/popup-ref';
import {ComponentPortal, PortalInjector} from '@angular/cdk/portal';
import {PopupComponent} from '../components/popup/popup.component';
import {OffsetToken} from '../utils/offset-injector';

const BASE_OFFSET = 8;

export type PopupParams<T> = {
  origin: HTMLElement;
  content: PopupContent;
  data?: T;
  width?: string | number;
  height?: string | number;
};

@Injectable()
export class PopupService {

  constructor(private overlay: Overlay,
              private injector: Injector,
              @Inject(OffsetToken) private offsetValue: number) {
  }

  open<T>({origin, content, data, width, height}: PopupParams<T>) {
    const overlayRef = this.overlay.create(this.getOverlayConfig({origin, width, height}));

    const popupRef = new PopupRef<T>(overlayRef, content, data);

    const injector = this.createInjector(popupRef, this.injector);
    overlayRef.attach(new ComponentPortal(PopupComponent, null, injector));

    return popupRef;
  }

  createInjector(popupRef: PopupRef, injector: Injector) {
    const tokens = new WeakMap([[PopupRef, popupRef]]);
    return new PortalInjector(injector, tokens);
  }

  private getOverlayConfig({origin, width, height}): OverlayConfig {
    return new OverlayConfig({
      width,
      height,
      hasBackdrop: true,
      backdropClass: 'popover-backdrop',
      positionStrategy: this.getOverlayPosition(origin),
      scrollStrategy: this.overlay.scrollStrategies.reposition()
    });
  }

  private getOverlayPosition(origin: HTMLElement): PositionStrategy {
    return this.overlay.position()
      .flexibleConnectedTo(origin)
      .withPositions(this.getPositions())
      .withPush(false);
  }

  private getPositions(): ConnectionPositionPair[] {
    return [
      {
        originX: 'center',
        originY: 'top',
        overlayX: 'center',
        overlayY: 'bottom',
        offsetY: -this.offsetValue
      },
      {
        originX: 'center',
        originY: 'bottom',
        overlayX: 'center',
        overlayY: 'top',
        offsetY: this.offsetValue
      },
    ];
  }
}
