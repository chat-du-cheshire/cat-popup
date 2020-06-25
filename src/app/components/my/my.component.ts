import { Component, OnInit } from '@angular/core';
import {PopupRef} from '../../../../projects/popup/src/lib/utils/popup-ref';

@Component({
  selector: 'app-my',
  templateUrl: './my.component.html',
  styleUrls: ['./my.component.scss']
})
export class MyComponent {

  skills: number[];

  constructor(private popoverRef: PopupRef) {
    this.skills = this.popoverRef.data.skills;
  }

  close() {
    this.popoverRef.close({ id: 1 });
  }
}
