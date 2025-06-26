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
}
