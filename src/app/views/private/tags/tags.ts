import { Component, signal, inject, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InterfaceTagResponse } from '@models/interface.models';
import { Interface } from '@services/interface';
import { Notification } from '@services/notification';
import { Button } from 'src/app/components/ui/button/button';
@Component({
  selector: 'main[app-tags]',
  imports: [CommonModule, Button],
  templateUrl: './tags.html',
  styleUrl: './tags.scss'
})
export class Tags {
  // services injection
  interfaceService = inject(Interface);
  notificationService = inject(Notification);

   // Async data
   public interfaceTag = signal<InterfaceTagResponse | undefined>({});

    // Selected item
  public selectedIdItem = signal(0);


   constructor() {
    effect(()=>{
      const tagResource = this.interfaceService.getTagNavigation;
      this.interfaceTag.set(tagResource.value())
      console.log(this.interfaceTag())
    })
   }



  /**
   * Get the result of the action for each button
   * @param id 
   */
  selectBtn(id: string,  event?: MouseEvent) {
    event?.stopPropagation();
    console.log('selectBtn', id);

    switch (id) {
      case 'add':
        console.log('add')
        // this.isCreateTagOverlay = !this.isCreateTagOverlay;
        // this.isMask = true;
        break;
        case 'update':
        console.log('update')
        //  if (!this.selectedIdItem) return;
        // this.isUpdateTagOverlay = !this.isUpdateTagOverlay;
        // this.isMask = true;
        break;
        case 'delete':
        console.log('delete')
        //  if (!this.selectedIdItem) return;
        // this.bgColor = 'redlight';
        // this.notificationAction = 'delete';
        // this.notificationsService.displayNotification(this, 'is-delete', 0, '/backoffice', 'client', true);
        break;
        case 'display':
        console.log('display')
        //  if (!this.selectedIdItem) return;
        // this.bgColor = 'yellowlight';
        // this.notificationAction = 'display';
        // this.notificationsService.displayNotification(this, 'is-display', 0, '/backoffice', 'client', true);
        break;
      default:
        // this.isCreateTagOverlay = false;
        break;
    }
  }
}
