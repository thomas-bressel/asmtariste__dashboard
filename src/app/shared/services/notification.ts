import { Injectable, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Loading } from './loading';
import { Auth } from './auth';
@Injectable({
  providedIn: 'root'
})
export class Notification {
  router = inject(Router);
  loadingService = inject(Loading);
  authService = inject(Auth);

  readonly notificationMessages: Record<string, string> = {
    'LOGIN_SUCCESS': 'Connexion réussie',
    'IS_LOGOUT' : 'Vous êtes sur le point de fermer votre session',
    'TAG_CREATE_SUCCESS' : 'Le nouveau tag à été ajouté avec succès.',
    'logout-success': 'Déconnexion réussie',
    'session-invalid': 'Votre session est invalide, veuillez vous reconnecter'
  }

  // Shared global state
  public isNotificationWindow = signal(false);
  public notificationMessage = signal('');
  public isChoiceButtons = signal(false);
  public backgroundColor = signal('');
  public actionOnConfirm = signal('');



  constructor() { }

  /**
 * Configure notification background color
 */
  public configNotification(bgColor: string = 'green', action?: string): void {
    this.backgroundColor.set(bgColor);
    action ? this.actionOnConfirm.set(action) : null;
  }

  /**
   * 
   * display notifications 
   * 
   * @param component the actual component 'this' 
   * @param key the key of the message to show
   * @param timer  duration of the message displayed on the screen
   * @param redirect choose or not to redirect to a page '/dashboard' (for example) or null to disable redirect
   * @param origin  if the message is comming from the 'client' or from the 'server'
   * @param choice true if modal box must show choice buttons
   */
  public displayNotification(key: string, timer: number = 0, redirect: string | null, origin: string, choice: boolean): void {
    this.isChoiceButtons.set(choice); // display choice button or not
    this.isNotificationWindow.set(true); // Most of time set to true to display the notification

    // Check where is the message key from
    if (origin === 'client' || origin === undefined) {
      this.notificationMessage.set(this.getNotificationMessage(key));
    } else if (origin === 'server') {
      this.notificationMessage.set(key);
    }

    if (timer > 0) {
      setTimeout(() => {
        this.isNotificationWindow.set(false);

        if (redirect !== null) {
          this.router.navigate([redirect]);
        }
      }, timer);
    }
  }

  /**
 * 
 * Method to get the notification message from the array by its key
 * 
 * @param key the key of the notification message to get
 * @returns 
 */
  private getNotificationMessage(key: string): string {
    return this.notificationMessages[key];
  }



  /**
* Hide notification manually
*/
  public hide(): void {
    this.isNotificationWindow.set(false);
  }


  public action(): void {
    const action = this.actionOnConfirm();
    this.hide();
    this.loadingService.isLoading.set(true)
    switch (action) {
      case 'logout':
        this.authService.deleteSession();
        this.router.navigate(['/login'])
        break;
  
      default:
        console.warn(`Unhandled action: ${action}`);
    }
  }
  

}
