import { Injectable, inject, signal, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { Loading } from './loading';
import { Auth } from './auth';
import { Tag } from './tag';

@Injectable({
  providedIn: 'root'
})
export class Notification {
  router = inject(Router);
  loadingService = inject(Loading);
  authService = inject(Auth);
  private injector = inject(Injector); // Injection du Injector pour lazy loading

  readonly notificationMessages: Record<string, string> = {
    'LOGIN_SUCCESS': 'Connexion réussie',
    'IS_LOGOUT': 'Vous êtes sur le point de fermer votre session',
    'TAG_CREATE_SUCCESS': 'Le nouveau tag à été ajouté avec succès.',
    'IS_DELETE_TAG': 'Êtes-vous sûr de vouloir supprimer ce tag ?',
    'logout-success': 'Déconnexion réussie',
    'session-invalid': 'Votre session est invalide, veuillez vous reconnecter'
  }

  // Shared global state
  public isNotificationWindow = signal(false);
  public notificationMessage = signal('');
  public isChoiceButtons = signal(false);
  public backgroundColor = signal('');
  public actionOnConfirm = signal('');
  
  // Store l'ID du tag à supprimer
  private tagIdToDelete = signal<number>(0);

  constructor() { }

  /**
   * Configure notification background color
   */
  public configNotification(bgColor: string = 'green', action?: string): void {
    this.backgroundColor.set(bgColor);
    action ? this.actionOnConfirm.set(action) : null;
  }

  /**
   * Stocker l'ID du tag à supprimer
   */
  public setTagToDelete(tagId: number): void {
    this.tagIdToDelete.set(tagId);
  }

  /**
   * Display notifications 
   * @param key the key of the message to show
   * @param timer duration of the message displayed on the screen
   * @param redirect choose or not to redirect to a page '/dashboard' (for example) or null to disable redirect
   * @param origin if the message is comming from the 'client' or from the 'server'
   * @param choice true if modal box must show choice buttons
   */
  public displayNotification(key: string, timer: number = 0, redirect: string | null, origin: string, choice: boolean): void {
    this.isChoiceButtons.set(choice);
    this.isNotificationWindow.set(true);

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
   * Method to get the notification message from the array by its key
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

  /**
   * Execute action based on confirmation
   */
  public async action(): Promise<void> {
    const action = this.actionOnConfirm();
    this.hide();
    this.loadingService.isLoading.set(true);
    
    try {
      switch (action) {
        case 'logout':
          this.authService.deleteSession();
          this.router.navigate(['/login']);
          break;
        case 'delete-tag':
          // INJECTION LAZY - seulement quand nécessaire
          const tagService = this.injector.get(Tag);
          const tagId = this.tagIdToDelete();
          
          if (tagId > 0) {
            console.log('Suppression du tag:', tagId);
            await tagService.deleteTag(tagId);
            tagService.removeTagFromStore(tagId);
            console.log('Tag supprimé avec succès');
          }
          break;
        default:
          console.warn(`Unhandled action: ${action}`);
      }
    } catch (error) {
      console.error('Erreur lors de l\'action:', error);
    } finally {
      this.loadingService.isLoading.set(false);
    }
  }
}