import { Component, inject, signal, effect } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Form } from '@services/form';
import { InputField } from 'src/app/components/ui/input-field/input-field';
import { Button } from 'src/app/components/ui/button/button';
import { SelectField } from 'src/app/components/ui/select-field/select-field';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'section[app-create-tag]',
  imports: [ReactiveFormsModule, InputField, Button, SelectField],
  host: {
    'class': 'mask',
  },
  templateUrl: './create-tag.html',
  styleUrl: './create-tag.scss'
})
export class CreateTag {

  // Services injection dependencies
  private formService = inject(Form);
  private router = inject(Router);
  private route = inject(ActivatedRoute);


  // Fields Velues
  labelValue = signal<string>('');
  colorValue = signal<string>('');
  backgroundValue = signal<string>('');
  borderValue = signal<string>('');

  // Form state
  createTagForm = signal<FormGroup>(this.formService.initCreateTagForm())

  // import datas
  //
  // *******  MUST BE IN A MONGO DB COLLECTION ******
  //
  textColors = this.formService.textColor;
  backgroundColors = this.formService.backgroundColor;
  borderColors = this.formService.borderColor;

  constructor() {
    effect(() => {
      // Synchronize values with the form group
      this.createTagForm().get('label')?.setValue(this.labelValue(), { emitEvent: false });
      this.createTagForm().get('color')?.setValue(this.colorValue(), { emitEvent: false });
      this.createTagForm().get('background_color')?.setValue(this.backgroundValue(), { emitEvent: false });
      this.createTagForm().get('border_color')?.setValue(this.borderValue(), { emitEvent: false });
    })
  }



  /**
   * get label field values and update signals
   * @param value 
   */
  handleLabelValueChanged(value: string) {
    this.labelValue.set(value);
  }



  /**
   * get different color values depending on type of select field
   * @param value 
   * @param type 
   */
  handleSelectBoxValueChanged(value: string, type: string) {
    console.log('Option value changed:', value);
    
    if (type === 'textColor') {
      this.colorValue.set(value);
    } else if (type === 'backgroundColor') {
      this.backgroundValue.set(value);
    } else if (type === 'borderColor') {
      this.borderValue.set(value);
    }
  }
  


 async onSubmit() {
    console.log(this.labelValue())
  }

  onCancel() {
    this.createTagForm().reset();
    this.router.navigate(['./create'], { relativeTo: this.route });
  }

}
