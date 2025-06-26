import { Injectable, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { InterfaceNavigationReponse, InterfaceTagResponse } from '../models/interface.models';
import { Auth } from './auth';
import { USER_API_URI } from '../config';
@Injectable({
  providedIn: 'root'
})
export class Interface {

  readonly serviceAuth = inject(Auth);

  public readonly getMainNavigation = httpResource<InterfaceNavigationReponse>(() => {
    return {
      url: `${USER_API_URI}/user/v1/admin/interface?type=navigation`,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.serviceAuth.getAccessToken()}`
      }
    };
  });


  public readonly getTagNavigation = httpResource<InterfaceTagResponse>(() => {
    return {
      url: `${USER_API_URI}/user/v1/admin/interface?type=tag`,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.serviceAuth.getAccessToken()}`
      }
    };
  })
}
