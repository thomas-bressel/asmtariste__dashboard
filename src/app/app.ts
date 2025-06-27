// Angular imports
import { HttpErrorResponse } from '@angular/common/http';
import { Component, effect, inject, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';

// Service imports
import { Loading } from '@services/loading'; 
import { Auth } from '@services/auth';
import { Notification as NotificationService } from '@services/notification';
import { Selector } from '@services/selector';

// Component imports
import { Notification as NotificationComponent } from './components/overlays/notification/notification';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NotificationComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {

  readonly authService = inject(Auth);
  readonly loadingService = inject(Loading);
  readonly notificationService = inject(NotificationService);
  readonly selectorService = inject(Selector);

  // For template
  isLoading = this.loadingService.isLoading;

  constructor() {
    effect(() => {
      const status = this.authService.sessionVerification.status();
      const error = this.authService.sessionVerification.error();

      this.loadingService.hide();

      if (error instanceof HttpErrorResponse && status === 'error' && error?.error?.code === 'TOKEN_EXPIRED') {
        this.authService.refreshAccessToken();
      }
    });

    // Reference of selectorService for init
    this.selectorService;
  }
  
  /**
   * execute the method if a click event on the HTML document
   * @param event 
   */
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    this.selectorService.unselectOnClickOutside(event);
  }
}