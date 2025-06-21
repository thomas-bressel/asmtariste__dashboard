import { Component, signal } from '@angular/core';
import { Button } from '../ui/button/button';

@Component({
  selector: 'header[app-header]',
  imports: [Button],
  host: {
    'class': 'header'
  },
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {
// async data attributes
isNavigationOverlay = signal(false);



  handleNavigationOverlay() {
    this.isNavigationOverlay.set(!this.isNavigationOverlay());
  }
}
