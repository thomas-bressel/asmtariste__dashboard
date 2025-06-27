// Angular imports
import { Injectable, inject, signal, computed, effect } from '@angular/core';
import { httpResource } from '@angular/common/http';

// Service imports
import { Auth } from './auth';

// Model imports
import { TagDataResponse } from '@models/tag.model';
import { TagData } from '@models/tag.model';

// Config imports
import { CONTENT_API_URI } from '../config';

@Injectable({
  providedIn: 'root'
})
export class Tag {
  // Dependencies in jection
  readonly serviceAuth = inject(Auth);

  // Signal store
  private tagsStore = signal<TagData[]>([]);
  private isLoaded = signal(false);
  private reloadTrigger = signal(0);



  /**
   * Get all tags from the server
   * httpResource trigerred when reloadTrigger is updated
   * and during the first initialisation of the service
   */
  public readonly getAllTags = httpResource<TagDataResponse>(() => {
    this.reloadTrigger();
    return {
      url: `${CONTENT_API_URI}/content/v1/admin/tags`,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.serviceAuth.getAccessToken()}`
      }
    };
  });


  constructor() {
    // Effect triggered the first init and when getAllTags and tagsStore are updated
    effect(() => {
      if (!this.isLoaded()) {
      const resource = this.getAllTags;       // get all tags from server
      const value = resource.value?.();

        if (Array.isArray(value) && value.length > 0) {
          this.tagsStore.set(value);   // Store tags data into store
          this.isLoaded.set(true);   // First load is done
        }
      }
    });
  }


  /**
   * Computed signal triggered when tagsStore is updated
   */
  public readonly tagsData = computed(() => {
    const tags = this.tagsStore();
    return tags.filter(tag => tag && tag.label).sort((a, b) => {
      return (a.label || '').localeCompare(b.label || '');
    });
  });


  /**
   * Create a new Tag
   * @param formData 
   * @returns 
   */
  public async createTag(formData: URLSearchParams): Promise<Response> {
    return await fetch(`${CONTENT_API_URI}/content/v1/admin/tag/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${this.serviceAuth.getAccessToken()}`
      },
      body: formData
    });
  }


  /**
   * Add a tag to the store
   * @param newTag 
   */
  addTagToStore(newTag: TagData) {
    this.tagsStore.update(tags => {
      const newTags = [...tags, newTag];
      return newTags;
    });
  }

/**
 * Force reload data from the server
 */
  public forceReload() {
    this.isLoaded.set(false);
    this.reloadTrigger.update(n => n + 1); 
  }

}