import { Injectable, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { NavigationReponse } from '../models/interface.models';
import { Auth } from './auth';

@Injectable({
  providedIn: 'root'
})
export class Interface {

  readonly serviceAuth = inject(Auth)

  public readonly getMainNavigation = httpResource<NavigationReponse>(() => {
    return {
      url: 'http://localhost:5002/user/v1/admin/interface?type=navigation',
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.serviceAuth.getAccessToken()}`
      }
    };
  });
}
