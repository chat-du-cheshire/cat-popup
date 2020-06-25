import {InjectionToken} from '@angular/core';

const DEFAULT_OFFSET_VALUE = 8; // px
export const OffsetToken = new InjectionToken('Popup offset value from host', {
  factory: () => DEFAULT_OFFSET_VALUE
});
