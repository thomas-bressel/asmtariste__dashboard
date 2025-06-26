import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Selector {

  // Actual input component if focused
  public currentFocusedId = signal<string | null>(null);

  // Actuel item if selected
  public selectedIdItem = signal(0);

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



  /**
* Manage steps for the item to select
* @param id 
* @param event 
* @returns 
*/
  selectItem(id: number, event: MouseEvent): void {
    event.stopPropagation();
    this.selectedIdItem.update(() => this.selectedIdItem() === id ? 0 : id)
  }



  /**
* Listen for click events outside the user nav to unselect the item
* @param event 
* @returns 
*/
  unselectOnClickOutside(event: MouseEvent) {
    const clickedElement = event.target as HTMLElement;
    if (clickedElement.closest('#tag-nav')) return;
    this.selectedIdItem.set(0);
  }

}
