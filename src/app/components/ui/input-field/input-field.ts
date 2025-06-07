import { Component, signal, input, output, computed,  effect } from '@angular/core';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'div[app-input-field]',
  imports: [CommonModule],
  templateUrl: './input-field.html',
  styleUrl: './input-field.scss'
})
export class InputField {


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
  isFocused = signal(false);
  isIconActivated = signal(false);

  // internal signals used for input change value
  currentType = signal('');
  currentIcon = signal('');

  // is label signal is a password field type 
  isPasswordField = computed(() => this.label() === 'password');


  constructor() {
    // initilize internal signal with input values
    effect(() => {
      this.currentType.set(this.type());
      this.currentIcon.set(this.icon());
    });

    // debug
    effect(() => {
      console.log("icon : ", this.icon())
      console.log("current icon : ", this.currentIcon())
      console.log("placeholder : ", this.placeholder())
      console.log("label : ", this.label())
      console.log("type : ", this.type())
      console.log("current type : ", this.currentType())
      console.log("name : ", this.name())
      console.log("minlength : ", this.minlength())
      console.log("maxlength : ", this.maxlength())
    });
  }




  /**
   * Active 'selected' class when the input field is clicked
   * @param event 
   */
  onFieldClick(event: MouseEvent) {
    event.stopPropagation();
    this.isFocused.set(true);
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


