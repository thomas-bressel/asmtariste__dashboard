import { Injectable, inject, signal, computed } from '@angular/core';
import { InterfaceNavigationReponse, InterfaceTagResponse } from '../models/interface.models';
import { Auth } from './auth';
import { USER_API_URI } from '../config';

@Injectable({
  providedIn: 'root'
})
export class Interface {
  readonly serviceAuth = inject(Auth);

  // Signals datas
  private mainNavigationData = signal<InterfaceNavigationReponse | null>(null);
  private tagNavigationData = signal<InterfaceTagResponse | null>(null);
  private isLoadingMain = signal(false);
  private isLoadingTag = signal(false);

  /**
   * Computed to get main navigation datas
   */
  public readonly getMainNavigation = computed(() => {
    return {
      value: () => this.mainNavigationData(),
      status: () => this.mainNavigationData() ? 'resolved' : 'idle',
      error: () => null 
    };
  });



  /**
   * Computed to get tag navigation datas
   */
  public readonly getTagNavigation = computed(() => {
    return {
      value: () => this.tagNavigationData(),
      status: () => this.tagNavigationData() ? 'resolved' : 'idle',
      error: () => null
    };
  });



  /**
   * Load main navigation
   */
  public async loadMainNavigation(): Promise<InterfaceNavigationReponse | null> {
    try {
      this.isLoadingMain.set(true);
      
      const response = await fetch(`${USER_API_URI}/user/v1/admin/interface?type=navigation`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${this.serviceAuth.getAccessToken()}`
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      this.mainNavigationData.set(data);
      return data;
      
    } catch (error) {
      console.error('Erreur lors du chargement de la navigation principale:', error);
      this.mainNavigationData.set(null);
      return null;
    } finally {
      this.isLoadingMain.set(false);
    }
  }



  /**
   * Load tags navigation
   */
  public async loadTagNavigation(): Promise<InterfaceTagResponse | null> {
    try {
      this.isLoadingTag.set(true);
      
      const response = await fetch(`${USER_API_URI}/user/v1/admin/interface?type=tag`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${this.serviceAuth.getAccessToken()}`
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      this.tagNavigationData.set(data);
      return data;
      
    } catch (error) {
      console.error('Erreur lors du chargement de la navigation des tags:', error);
      this.tagNavigationData.set(null);
      return null;
    } finally {
      this.isLoadingTag.set(false);
    }
  }

  /**
   * States de chargement
   */
  public readonly loadingMain = computed(() => this.isLoadingMain());
  public readonly loadingTag = computed(() => this.isLoadingTag());
}