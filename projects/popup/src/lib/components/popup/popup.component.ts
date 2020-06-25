import {ChangeDetectionStrategy, Component, OnInit, TemplateRef} from '@angular/core';
import {ERenderMethod} from '../../utils/RenderMethod';
import {PopupContent, PopupRef} from '../../utils/popup-ref';

@Component({
  selector: 'cat-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PopupComponent implements OnInit {
  rendererType = ERenderMethod;
  renderMethod: ERenderMethod = ERenderMethod.Component;
  content: PopupContent;
  context;

  constructor(private popupRef: PopupRef) {
  }

  ngOnInit() {
    this.content = this.popupRef.content;

    if (typeof this.content === 'string') {
      this.renderMethod = ERenderMethod.Text;
    } else if (this.content instanceof TemplateRef) {
      this.renderMethod = ERenderMethod.Template;
      this.context = {
        close: this.popupRef.close.bind(this.popupRef)
      };
    }
  }}
