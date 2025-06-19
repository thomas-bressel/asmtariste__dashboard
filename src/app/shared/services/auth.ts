import { Injectable } from '@angular/core';
import { httpResource } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class Auth {
  
  public readonly sessionVerification = httpResource<boolean>(() => {
    return {
      url: 'http://localhost:5002/user/v1/admin/verify',
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.getAccessToken()}`
      }
    };
  });





/**
 * Refresh the access token if the access token is not valid
 * @returns 
 */
  public async refreshAccessToken(): Promise<string | null> {
    if (!this.getRefreshToken()) return null;
  
    try {
      const response = await fetch('http://localhost:5002/user/v1/admin/refresh', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.getRefreshToken()}`
        }
      });
  
      if (!response.ok) return null;
      const data = await response.json();

      // update tokens
      this.setTokens(data.sessionToken, data.refreshToken);
      return data.sessionToken;
    } catch {
      return null;
    }
  }


  /**
   * Update access token and refresh token 
   * @param sessionToken 
   * @param refreshToken 
   */
  private setTokens(sessionToken: string, refreshToken: string): void {
    localStorage.setItem('accessToken', sessionToken);
    localStorage.setItem('refreshToken', refreshToken);
  }

  private clearTokens(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }


  /**
   * Get access token from the local storage
   * @returns 
   */
  private getAccessToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  /**
   * Get refresh token from the local storage
   * @returns 
   */
  private getRefreshToken(): string | null {
    return localStorage.getItem('refreshToken');
  }

}
