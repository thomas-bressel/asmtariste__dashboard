import { Injectable, signal, HostListener } from '@angular/core';

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
    console.log('Item selectionné : ',event.target);
    console.log('Id de l\'Item selectionné : ',id);
    this.selectedIdItem.update(() => this.selectedIdItem() === id ? 0 : id)
  }



  /**
* Listen for click events outside the user nav to unselect the item
* @param event 
* @returns 
*/
  unselectOnClickOutside(event: MouseEvent) {
    console.log('Je suis dans la methode unselect')
    const clickedElement = event.target as HTMLElement;

    // Check if the clicked element is inside the user nav
    if (clickedElement.closest('#tag-nav')) return;
    this.selectedIdItem.set(0);
  }

}
