import { Component, inject, signal, effect } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Form } from '@services/form';
import { InputField } from 'src/app/components/ui/input-field/input-field';
import { Button } from 'src/app/components/ui/button/button';

@Component({
  selector: 'section[app-create-tag]',
  imports: [ReactiveFormsModule, InputField, Button],
  host: {
    'class': 'mask',
  },
  templateUrl: './create-tag.html',
  styleUrl: './create-tag.scss'
})
export class CreateTag {

  // Services injection dependencies
  private formService = inject(Form);

  // Fields Velues
  labelValue = signal<string>('');

  // Form state
  createTagForm = signal<FormGroup>(this.formService.initCreateTagForm())



  constructor() {
    effect(() => {
      // Synchronize values with the form group
      this.createTagForm().get('label')?.setValue(this.labelValue(), { emitEvent: false });
    })
  }



  /**
   * get label field values and update signals
   * @param value 
   */
  handleLabelValueChanged(value: string) {
    this.labelValue.set(value);
  }


 async onSubmit() {
    console.log(this.labelValue())
  }

  onCancel() {

  }

}
