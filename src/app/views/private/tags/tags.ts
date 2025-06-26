import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Interface } from '@services/interface';
import { Notification } from '@services/notification';
import { Button } from 'src/app/components/ui/button/button';
import { Tag } from '@services/tag';
import { Selector } from '@services/selector';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { Loading } from '@services/loading';

@Component({
  selector: 'main[app-tags]',
  imports: [RouterOutlet, CommonModule, Button],
  templateUrl: './tags.html',
  styleUrl: './tags.scss'
})
export class Tags {

  // services injection
  interfaceService = inject(Interface);
  notificationService = inject(Notification);
  tagService = inject(Tag);
  selectorService = inject(Selector);
  router = inject(Router);
  route = inject(ActivatedRoute);
  loadingService = inject(Loading); 
  
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
    const tags =  Array.isArray(value) ? value : [];
    return tags.sort((a, b) => a.label.localeCompare(b.label));
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
        this.router.navigate(['./create'], { relativeTo: this.route });
       
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
