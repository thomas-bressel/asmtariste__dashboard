import { Component, signal, inject, effect, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Interface } from '@services/interface';
import { Notification } from '@services/notification';
import { Button } from 'src/app/components/ui/button/button';
import { Tag } from '@services/tag';
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
  tagService = inject(Tag);
  
  // Async data
  public interfaceTag = computed(() => {
    const resource = this.interfaceService.getTagNavigation;
    const value = resource.value?.();
    return value || {};
  });
  
  public dataTagResponse = computed(() => {
    const resource = this.tagService.getAllTags;
    const value = resource.value?.();
    return Array.isArray(value) ? value : [];
  });

  
  // Selected item
  public selectedIdItem = signal(0);


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


    /**
   * Manage steps for the item to select
   * @param id 
   * @param event 
   * @returns 
   */
    selectItem(id: number, event: MouseEvent): void {
      event.stopPropagation();
      this.selectedIdItem.update(() => this.selectedIdItem() === id ? 0 : id) 
    }
}
