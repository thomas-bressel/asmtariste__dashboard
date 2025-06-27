import { Component, input, ElementRef, output, EventEmitter, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'div[app-select-field]',
  imports: [CommonModule],
  templateUrl: './select-field.html'
})
export class SelectField implements OnDestroy {

  fieldValue = output<string>();
  minlength = input('');
  maxlength = input('');
  placeholder = input('');
  label = input('');
  icon = input('');
  optionsList = input<{ value: string; label: string }[]>([]);



  private handleClickOutsideBound = this.handleClickOutside.bind(this);
  public isFocused: boolean = false;

  constructor(private elementRef: ElementRef) {
    document.addEventListener('click', this.handleClickOutsideBound);
  }

  /**
   * Active 'selected' class when the input field is clicked
   * @param event 
   */
  onFieldClick(event: MouseEvent) {
    event.stopPropagation();
    this.isFocused = true;
  }

  /**
   * Desactive 'selected' class when the input field is clicked outside
   * @param event 
   */
  handleClickOutside(event: MouseEvent) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isFocused = false;
    }
  }


  onSelectChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.fieldValue.emit(select.value);
  }
  

    /**
   * Destroy the event listener when the component is destroyed
   */
    ngOnDestroy() {
      document.removeEventListener('click', this.handleClickOutsideBound);
    }


}
