// Angular imports
import { Component, inject, signal, effect } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

// Service imports
import { Form } from '@services/form';
import { Loading } from '@services/loading';
import { Tag } from '@services/tag';
import { Notification } from '@services/notification';

// Components import
import { InputField } from 'src/app/components/ui/input-field/input-field';
import { Button } from 'src/app/components/ui/button/button';
import { SelectField } from 'src/app/components/ui/select-field/select-field';

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
  private loadingService = inject(Loading);
  private tagService = inject(Tag);
  private notificationService = inject(Notification);

  // Fields Values
  labelValue = signal<string>('');
  colorValue = signal<string>('');
  backgroundValue = signal<string>('');
  borderValue = signal<string>('');

  // Form state
  createTagForm = signal<FormGroup>(this.formService.initCreateTagForm())

  // Import datas
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
    if (type === 'textColor') {
      this.colorValue.set(value);
    } else if (type === 'backgroundColor') {
      this.backgroundValue.set(value);
    } else if (type === 'borderColor') {
      this.borderValue.set(value);
    }
  }




  /**
   * Send datas 
   * @returns 
   */
  public async onSubmit() {
    if (this.createTagForm().valid) {
      this.loadingService.show();
      const { label, color, background_color, border_color } = this.createTagForm().value;

      const formData = new URLSearchParams();
      formData.append('label', label);
      formData.append('color', color);
      formData.append('background_color', background_color);
      formData.append('border_color', border_color);

      try {
        const response = await this.tagService.createTag(formData);
        const data = await response.json();

        if (!response.ok) {
          this.notificationService.configNotification('red');
          this.notificationService.displayNotification(data.message || 'Erreur de connexion', 3000, null, 'server', false);
          this.loadingService.hide();
          return;
        }

        // Build the new tag with the received id
        const newTag = {
          id_tags: data,
          label: label,
          color: color,
          background_color: background_color,
          border_color: border_color,
          is_display: true
        };

        // add to the store
        this.tagService.addTagToStore(newTag);

        // Send a notification
        this.notificationService.configNotification('green');
        this.notificationService.displayNotification("TAG_CREATE_SUCCESS", 2000, '/dashboard/tags', 'client', false);

      } catch (error) {
        console.error('Erreur lors de la création:', error);
        this.loadingService.hide();
      } finally {
        this.loadingService.hide();
      }
    }
  }



  /**
   * Cancel the form and back to its parent route
   */
  onCancel() {
    this.createTagForm().reset();
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}