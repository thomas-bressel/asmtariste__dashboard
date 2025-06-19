import { HttpErrorResponse } from '@angular/common/http';
import { Component, effect, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Auth } from '@services/auth';
import { Loading } from '@services/loading';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {

  // Get the session resource from AuthService
  readonly authService = inject(Auth)
  readonly loadingService = inject(Loading);

  isLoading = signal(this.loadingService.isLoading);

  constructor() {
    effect(() => {
      const status = this.authService.sessionVerification.status(); // error or resolved
      const error = this.authService.sessionVerification.error();

      if (error instanceof HttpErrorResponse && status === 'error' && error?.error?.code === 'TOKEN_EXPIRED') {
        this.authService.refreshAccessToken();
      }
    });
  }

}
