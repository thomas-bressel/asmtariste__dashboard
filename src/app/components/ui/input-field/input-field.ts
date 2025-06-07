import { Component, signal, input, output, computed, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Selector } from '@services/selector';


@Component({
  selector: 'div[app-input-field]',
  imports: [CommonModule],
  templateUrl: './input-field.html',
  host: {
    '(document:click)': 'onDocumentClick()'
  }
})
export class InputField {
  private componentId = crypto.randomUUID();

  private selectorService = inject(Selector);

  fieldValue = output<string>();


  // Read only
  icon = input('');
  placeholder = input('');
  label = input('');
  type = input('');
  name = input('');
  minlength = input('');
  maxlength = input('');

  // Writable signals
  isIconActivated = signal(false);
  
  // internal signals used for input change value
  currentType = signal('');
  currentIcon = signal('');
  
  // is label signal is a password field type 
  isPasswordField = computed(() => this.label() === 'password');
  isFocused = computed(() => this.selectorService.isFocused(this.componentId));


  constructor() {
    // initilize internal signal with input values
    effect(() => {
      this.currentType.set(this.type());
      this.currentIcon.set(this.icon());
    });

  }


  /**
     * Active 'selected' class when the input field is clicked
     * @param event 
     */
  onFieldClick(event: MouseEvent) {
    event.stopPropagation();
    this.selectorService.setFocus(this.componentId);
  }

  /**
  * Manage click outside of the document to unselect
  * @param event 
  */
  onDocumentClick() {
    if (this.isFocused()) {
      this.selectorService.clearFocus();
    }
  }


  /**
   * If the input field is a password, change the type and icon when the icon is clicked
   * @param event 
   */
  onIconClick(event: MouseEvent) {
    event.stopPropagation();
    if (this.isPasswordField()) {
      const newType = this.currentType() === 'text' ? 'password' : 'text';
      this.currentType.set(newType);

      const newIcon = this.currentIcon() === 'eye-on' ? 'eye-off' : 'eye-on';
      this.currentIcon.set(newIcon);
    }
  }


  onInputChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.fieldValue.emit(input.value);
  }


}


