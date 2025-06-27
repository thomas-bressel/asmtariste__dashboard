import { Component, signal, inject, output, effect, OnInit } from '@angular/core';
import { Button } from '../ui/button/button';
import { InterfaceNavigationReponse } from 'src/app/shared/models/interface.models';
import { Navigation } from '../navigation/navigation';
import { Interface } from '@services/interface';
import { Notification } from '@services/notification';

@Component({
  selector: 'header[app-header]',
  imports: [Button, Navigation],
  host: {
    'class': 'header background-white'
  },
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header implements OnInit {
  // services injection
  interfaceService = inject(Interface);
  notificationService = inject(Notification);

  // Transmit interface data to its parents
  interfaceForNavigationComponent = output<InterfaceNavigationReponse>();

  isNavigationOverlay = signal<boolean>(false);
  interfaceNavigation = signal<InterfaceNavigationReponse | undefined>({});



  constructor() { }



  /**
   * Loading main navigation interface
   */
  async ngOnInit() {
    const data = await this.interfaceService.loadMainNavigation();
    
    if (data) {
      this.interfaceNavigation.set(data);
      this.interfaceForNavigationComponent.emit(data);
    }
  }



  /**
   * Method to toggle the menu overlay
   */
  public handleNavigationOverlay(): void {
    this.isNavigationOverlay.set(!this.isNavigationOverlay());
  }


  
  /**
   * Method to configure the action of the notification
   */
  public handleLogout(): void {
    this.notificationService.configNotification('red', 'logout');
    this.notificationService.displayNotification('IS_LOGOUT', 0, '/login', 'client', true);
  }

}
