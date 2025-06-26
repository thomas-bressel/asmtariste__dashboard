import { Component, effect, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Interface } from '@services/interface';
import { Notification } from '@services/notification';
import { Button } from 'src/app/components/ui/button/button';
import { Tag } from '@services/tag';
import { Selector } from '@services/selector';
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
  selectorService = inject(Selector);
  
  // Async data to display interface menu
  public interfaceTag = computed(() => {
    const resource = this.interfaceService.getTagNavigation;
    const value = resource.value?.();
    return value || {};
  });
  
  // Async data to display tags list
  public dataTagResponse = computed(() => {
    const resource = this.tagService.getAllTags;
    const value = resource.value?.();
    return Array.isArray(value) ? value : [];
  });

constructor() {}




  /**
   * Get the result of the action for each button
   * @param action 
   */
  selectBtn(action: string,  event?: MouseEvent) {
    event?.stopPropagation();
    switch (action) {
      case 'add':
        console.log('selectBtn action : ', action);
       
        break;
        case 'update':
          console.log('selectBtn action : ', action);
       
        break;
        case 'delete':
          if (!this.selectorService.selectedIdItem()) return;
          console.log('selectBtn action : ', action);
      
        break;
        case 'display':
          console.log('selectBtn action : ', action);
        
        break;
      default:
      
        break;
    }
  }


}
