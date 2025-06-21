import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Button } from '../../ui/button/button';
@Component({
  selector: 'div[app-notification]',
  imports: [CommonModule, Button],
  templateUrl: './notification.html',
  styleUrl: './notification.scss'
})
export class Notification {
  
  backgroundColor = input(''); // for the window background
  notificationMessage = input('Aucun message'); // the message to display
  isChoiceButtons = input(false); // display buttons of not

  closeNotification = output();
  confirmNotification = output();


/**
 * 
 * @param choice 
 */
public onChoice(choice: boolean): void {
  choice ?  this.confirmNotification.emit() : this.closeNotification.emit();
  }



}
