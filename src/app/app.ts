import { HttpErrorResponse } from '@angular/common/http';
import { Component, effect, inject } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { AuthService } from '@services/auth';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {

  // Get the session resource from AuthService
  readonly authService = inject(AuthService)

  
  constructor() {
    effect(() => {
      const status = this.authService.sessionVerification.status();
      const error = this.authService.sessionVerification.error();

      console.log('status', status);
      console.log('error :', error);
      
      if (error instanceof HttpErrorResponse && status === 'error' && error?.error?.code === 'TOKEN_EXPIRED') {
        this.authService.refreshAccessToken();
      }
    });
  }
    

      

     

  
}
