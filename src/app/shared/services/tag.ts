// Angular imports
import { Injectable, inject, signal, computed } from '@angular/core';

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

  // Signal to store temporary modification
  private tagsStore = signal<TagData[]>([]);

  // Server datas (datas received from the server)
  private serverTags = signal<TagData[]>([]);

  // Flag to know which store to use (Local or server)
  private toggleLocalStore = signal(false);
  private isLoading = signal(false);


 
  /**
   * Computed signal with server cache and local store
   */
  public readonly tagsData = computed(() => {
    // Use the local store
    if (this.toggleLocalStore()) {
      return this.tagsStore()
        .filter(tag => tag && tag.label)
        .sort((a, b) => (a.label || '').localeCompare(b.label || ''));
    }

    // Use the server datas
    return this.serverTags()
      .filter(tag => tag && tag.label)
      .sort((a, b) => (a.label || '').localeCompare(b.label || ''));
  });



  /**
   * Loading state
   */
  public readonly loading = computed(() => this.isLoading());



  /**
   * Get all tags from server
   * @returns 
   */
  public async getAllTags(): Promise<TagData[]> {
    try {
      this.isLoading.set(true);
      
      const response = await fetch(`${CONTENT_API_URI}/content/v1/admin/tags`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${this.serviceAuth.getAccessToken()}`
        }
      });

      if (!response.ok)  throw new Error(`HTTP ${response.status}: ${response.statusText}`);

      const data = await response.json();
      
      // Update 
      if (Array.isArray(data)) {
        this.serverTags.set(data);
        return data;
      }
      
      return [];
      
    } catch (error) {
      console.error('Erreur lors du chargement des tags:', error);
      return [];
    } finally {
      this.isLoading.set(false);
    }
  }



  /**
   * Loading tags from server
   */
  public async loadTags() {
    this.toggleLocalStore.set(false);
    await this.getAllTags();
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
   * @param tagId 
   * @returns 
   */
  public async deleteTag(tagId: number): Promise<Response> {
    const token = this.serviceAuth.getAccessToken();
    if (!token) throw new Error('No token available');
        
    return await fetch(`${CONTENT_API_URI}/content/v1/admin/tag/delete?id=${tagId}`, {
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

    // Get actual tags
    const currentTags = this.toggleLocalStore() ? this.tagsStore() : this.serverTags();

    if (Array.isArray(currentTags)) {
      // Add new tag to old tag
      const allTags = [...currentTags, newTag];
      this.tagsStore.set(allTags);
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
    
    if (this.toggleLocalStore()) {
      this.tagsStore.update(tags => tags.filter(tag => tag.id_tags !== tagId));
    } else {
      const updatedTags = this.serverTags().filter(tag => tag.id_tags !== tagId);
      this.tagsStore.set(updatedTags);
      this.toggleLocalStore.set(true);
    }
  }

}