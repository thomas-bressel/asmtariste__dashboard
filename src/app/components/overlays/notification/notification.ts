import { Component, input, output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Button } from '../../ui/button/button';
import { Notification as NotificationService } from '@services/notification';


@Component({
  selector: 'div[app-notification]',
  imports: [CommonModule, Button],
  templateUrl: './notification.html',
  styleUrl: './notification.scss'
})
export class Notification {

  notificationService = inject(NotificationService);
  
  backgroundColor = input(''); // for the window background
  notificationMessage = input('Aucun message'); // the message to display
  isChoiceButtons = input(false); // display buttons of not

/**
 * 
 * @param choice 
 */
public onChoice(choice: boolean): void {
  choice ?  this.notificationService.action() : this.notificationService.hide();
  }



}
