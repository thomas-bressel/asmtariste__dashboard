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
   * @param id 
   */
  selectBtn(id: string,  event?: MouseEvent) {
    event?.stopPropagation();
    console.log('selectBtn', id);

    switch (id) {
      case 'add':
        console.log('add')
       
        break;
        case 'update':
        console.log('update')
       
        break;
        case 'delete':
        console.log('delete')
      
        break;
        case 'display':
        console.log('display')
        
        break;
      default:
      
        break;
    }
  }


}
