import { Component, signal, inject, output, effect } from '@angular/core';
import { Button } from '../ui/button/button';
import { NavigationReponse } from 'src/app/shared/models/interface.models';
import { Navigation } from '../navigation/navigation';
import { Interface } from '@services/interface';

@Component({
  selector: 'header[app-header]',
  imports: [Button, Navigation],
  host: {
    'class': 'header background-white'
  },
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {
  // services injection
  serviceInterface = inject(Interface);
  
  // Transmit interface data to its parents
  interfaceForNavigationComponent = output<NavigationReponse>();
  
  isNavigationOverlay = signal<boolean>(false);
  interfaceNavigation = signal<NavigationReponse | undefined>(undefined); // async data from Interface service

  constructor() {
    effect(() => {
      const navigationResource = this.serviceInterface.getMainNavigation;
      
      // Check if value exists 
      if (navigationResource.value()) {
        const data = navigationResource.value()!;
        this.interfaceNavigation.set(data);
        this.interfaceForNavigationComponent.emit(data);
      }
      
      // Check if errors exist
      if (navigationResource.error()) {
        this.interfaceNavigation.set(undefined);
      }
    });
  }  


/**
 * Method to toggle the menu overlay
 */
  handleNavigationOverlay() {
    this.isNavigationOverlay.set(!this.isNavigationOverlay());
  }
}
