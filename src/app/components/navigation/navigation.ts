import { Component, output, input} from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { InterfaceNavigationReponse } from '../../shared/models/interface.models'
@Component({
  selector: 'nav[app-navigation]',
  imports: [CommonModule, RouterModule],
  templateUrl: './navigation.html',
  styleUrl: './navigation.scss'
})
export class Navigation {

 isNavigationOverlay = output<boolean>();
 interfaceForNavigationComponent = input<InterfaceNavigationReponse>();



  handleCloseMenu() {
    this.isNavigationOverlay.emit(false);
  }
}
