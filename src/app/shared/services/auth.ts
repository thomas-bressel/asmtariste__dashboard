import { Injectable } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { USER_API_URI } from '../config';

@Injectable({
 providedIn: 'root'
})
export class Auth {


 public readonly sessionVerification = httpResource<boolean>(() => {
   return {
     url: `${USER_API_URI}/user/v1/admin/verify`,
     method: 'GET',
     headers: {
       Authorization: `Bearer ${this.getAccessToken()}`
     }
   };
 });

 /**
  * Vérifie la session via fetch (pour le guard)
  * @returns Promise<Response>
  */
 public async verifySession(): Promise<Response> {
   const token = this.getAccessToken();
   
   if (!token) {
     throw new Error('No token available');
   }
   
   return await fetch(`${USER_API_URI}/user/v1/admin/verify`, {
     method: 'GET',
     headers: {
       Authorization: `Bearer ${token}`
     }
   });
 }

 /**
  * Send credential to the API to create a new session
  * @param formData 
  * @returns 
  */
 public async createSession(formData: URLSearchParams): Promise<Response> {
   return await fetch(`${USER_API_URI}/user/v1/admin/login`, {
     method: 'POST',
     headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
     body: formData
   });
 }

 /**
  * Refresh the access token if the access token is not valid
  * @returns 
  */
 public async refreshAccessToken(): Promise<string | null> {
   if (!this.getRefreshToken()) return null;

   try {
     const response = await fetch(`${USER_API_URI}/user/v1/admin/refresh`, {
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
 public setTokens(sessionToken: string, refreshToken: string): void {
   localStorage.setItem('accessToken', sessionToken);
   localStorage.setItem('refreshToken', refreshToken);
 }


 /**
  * Clear tokens when logout user
  */
 public clearTokens(): void {
   localStorage.removeItem('accessToken');
   localStorage.removeItem('refreshToken');
 }

 /**
  * Get access token from the local storage
  * @returns 
  */
 public getAccessToken(): string | null {
   return localStorage.getItem('accessToken');
 }

 /**
  * Get refresh token from the local storage
  * @returns 
  */
 public getRefreshToken(): string | null {
   return localStorage.getItem('refreshToken');
 }
}