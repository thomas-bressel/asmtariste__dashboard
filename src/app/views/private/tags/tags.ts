// Angular imports
import { Component, inject, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';

// Service imports
import { Interface } from '@services/interface';
import { Tag } from '@services/tag';
import { Loading } from '@services/loading';
import { Selector } from '@services/selector';
import { Notification } from '@services/notification';

// Component imports
import { Button } from 'src/app/components/ui/button/button';

@Component({
  selector: 'main[app-tags]',
  imports: [RouterOutlet, CommonModule, Button],
  templateUrl: './tags.html',
  styleUrl: './tags.scss'
})
export class Tags implements OnInit {

  // Dependencies injection
  interfaceService = inject(Interface);
  tagService = inject(Tag);
  selectorService = inject(Selector);
  router = inject(Router);
  route = inject(ActivatedRoute);
  loadingService = inject(Loading);
  notificationService = inject(Notification);

  // Computed signal triggered when getTagNavigation is updated
  public interfaceTag = computed(() => {
    const resource = this.interfaceService.getTagNavigation;
    const value = resource.value();
    return value || {};
  });

  // Computed signal triggered when tagsData is updated from the service
  public dataTagResponse = computed(() => {
    return this.tagService.tagsData();
  });

  constructor() { }

  /**
   * Loading datas, all tags 
   */
  ngOnInit(): void {
    this.tagService.loadTags();
  }

  /**
   * Get the result of the action for each button
   * @param action 
   */
  selectBtn(action: string, event?: MouseEvent) {
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
        this.notificationService.configNotification('yellow', 'delete-tag');
        this.notificationService.displayNotification('IS_DELETE_TAG', 0, null, 'client', true);
        break;
      case 'display':
        console.log('selectBtn action : ', action);
        break;
      default:
        break;
    }
  }
}