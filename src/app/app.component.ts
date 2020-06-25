import {Component} from '@angular/core';
import {MyComponent} from './components/my/my.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'cdk-popup';
  component = MyComponent;
}
