import { HttpErrorResponse } from '@angular/common/http';
import { Component, effect, inject, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Auth } from '@services/auth';
import { Loading } from '@services/loading';
import { Notification  as NotificationComponent } from './components/overlays/notification/notification';
import { Notification as NotificationService} from '@services/notification';
import { Selector } from '@services/selector';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NotificationComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {

  readonly authService = inject(Auth)
  readonly loadingService = inject(Loading);
  readonly notificationService = inject(NotificationService);
  readonly selectorService = inject(Selector);


  // For template
  isLoading = this.loadingService.isLoading;

  constructor() {
    effect(() => {
      const status = this.authService.sessionVerification.status(); // error or resolved
      const error = this.authService.sessionVerification.error();

      this.loadingService.hide();

      if (error instanceof HttpErrorResponse && status === 'error' && error?.error?.code === 'TOKEN_EXPIRED') {
        this.authService.refreshAccessToken();
      }
    });

    this.selectorService;

  }
  

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    this.selectorService.unselectOnClickOutside(event)
  }

}
