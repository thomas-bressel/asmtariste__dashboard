import { HttpErrorResponse } from '@angular/common/http';
import { Component, effect, inject, signal, input } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Auth } from '@services/auth';
import { Loading } from '@services/loading';
import { Notification  as NotificationComponent } from './components/overlays/notification/notification';
import { Notification as NotificationService} from '@services/notification';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NotificationComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {

  readonly authService = inject(Auth)
  readonly loadingService = inject(Loading);
  readonly notificationService = inject(NotificationService)


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
  }
  

}
