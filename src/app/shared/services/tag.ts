import { Injectable, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { Auth } from './auth';
import { CONTENT_API_URI } from '../config';
import { TagDataResponse } from '@models/tag.model';

@Injectable({
  providedIn: 'root'
})
export class Tag {
  readonly serviceAuth = inject(Auth);


  /**
   * Get all tags
   */
  public readonly getAllTags = httpResource<TagDataResponse>(() => {
    return {
      url: `${CONTENT_API_URI}/content/v1/admin/tags`,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.serviceAuth.getAccessToken()}`
      }
    };
  });



  constructor() { }


  /**
    * Create a tag
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


}
