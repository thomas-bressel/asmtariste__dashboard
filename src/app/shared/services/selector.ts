import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Selector {

  // Sign contains the actual component if focused
  currentFocusedId = signal<string | null>(null);

  /**
   * Enable focus on a specific component
   * @param componentId
   */
  setFocus(componentId: string) {
    this.currentFocusedId.set(componentId);
  }

  /**
   * Disable focus for all components
   */
  clearFocus() {
    this.currentFocusedId.set(null);
  }

  /**
   * Check if this component is focused
   * @param componentId 
   * @returns
   */
  isFocused(componentId: string): boolean {
    return this.currentFocusedId() === componentId;
  }
}
