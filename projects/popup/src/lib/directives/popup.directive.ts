import {Directive, ElementRef, Input, OnDestroy, OnInit} from '@angular/core';
import {PopupService} from '../services/popup.service';
import {fromEvent, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {PopupContent} from '../utils/popup-ref';

@Directive({
  selector: '[catPopup]'
})
export class PopupDirective implements OnInit, OnDestroy {
  /**
   * Events which triggers popup
   */
  @Input() trigger: string[];

  @Input() content: PopupContent;

  @Input() data: any;

  @Input() width: number;

  @Input() height: number;

  private destroyed = new Subject();

  constructor(private popup: PopupService, private elementRef: ElementRef) {
  }

  ngOnInit() {
    fromEvent(this.elementRef.nativeElement, 'click')
      .pipe(takeUntil(this.destroyed))
      .subscribe(() => {
        this.popup.open({
          origin: this.elementRef.nativeElement,
          content: this.content,
          data: this.data,
          width: this.width,
          height: this.height
        });
      });
  }

  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }
}
