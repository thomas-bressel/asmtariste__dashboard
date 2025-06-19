import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Loading {
  public readonly isLoading = signal(false);
  
  show(): void {
    this.isLoading.set(true);
  }
  
  hide(): void {
    this.isLoading.set(false);
  }
}
