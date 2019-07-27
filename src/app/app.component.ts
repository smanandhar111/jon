import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'app';
  stickStateApp:boolean = false;

  notifyStickyState(stickState: boolean) {
  if(stickState) {
    this.stickStateApp = true;
  } else {
    this.stickStateApp = false
  }
  }
}
