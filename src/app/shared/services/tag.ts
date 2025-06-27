// Angular imports
import { Injectable, inject, signal, computed } from '@angular/core';
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
  // Dependencies injection
  readonly serviceAuth = inject(Auth);

  // Signal store
  private tagsStore = signal<TagData[]>([]);
  private toggleLocalStore = signal(false);


  /**
   * httpResource signal to get all tags from the server
   */
  public readonly getAllTags = httpResource<TagDataResponse>(() => ({
    url: `${CONTENT_API_URI}/content/v1/admin/tags`,
    method: 'GET',
    headers: {
      Authorization: `Bearer ${this.serviceAuth.getAccessToken()}`
    }
  }));



  /**
   * Computed signal with httpResource and  local store
   */
  public readonly tagsData = computed(() => {

    // Use the local store
    if (this.toggleLocalStore()) {
      return this.tagsStore()
        .filter(tag => tag && tag.label)
        .sort((a, b) => (a.label || '').localeCompare(b.label || ''));
    }

    // Use the server call
    const value = this.getAllTags.value?.();
    if (Array.isArray(value)) {
      return value
        .filter(tag => tag && tag.label)
        .sort((a, b) => (a.label || '').localeCompare(b.label || ''));
    }

    return [];
  });



  /**
   * Loading tags from server
   */
  public loadTags() {
    this.toggleLocalStore.set(false);
    this.getAllTags.reload?.();
  }



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
   * Delete tag 
   * @returns 
   */
  public async deleteTag(): Promise<Response> {
    const token = this.serviceAuth.getAccessToken();
    if (!token) throw new Error('No token available');
    this.serviceAuth.clearTokens();
    return await fetch(`${CONTENT_API_URI}/content/v1/admin/tag/delete`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }



  /**
   * Add a tag to the store
   * @param newTag 
   */
  public addTagToStore(newTag: TagData) {

    // get current tags from httpResource
    const currentTags = this.getAllTags.value?.();

    if (Array.isArray(currentTags)) {
      // add the tag with old tags
      const allTags = [...currentTags, newTag];
      this.tagsStore.set(allTags); // update the store
    } else {
      this.tagsStore.set([newTag]);
    }

    this.toggleLocalStore.set(true);
  }



  /**
   * Remove tag from store
   * @param tagId 
   */
  public removeTagFromStore(tagId: number) {
    this.tagsStore.update(tags => tags.filter(tag => tag.id_tags !== tagId));
  }



  /**
   * Force reload data from the server
   */
  public forceReload() {
    this.toggleLocalStore.set(false);
    this.getAllTags.reload?.();
  }
}