// angular imports
import { Component, inject, signal, effect } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

// services imports
import { Form } from '@services/form'

// component imports
import { InputField } from 'src/app/components/ui/input-field/input-field';
@Component({
  selector: 'main[app-login]',
  host: {
    'class': 'login'
  },
  imports: [ReactiveFormsModule, InputField],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  private formService = inject(Form)

  // Form state
  authForm = signal<FormGroup>(this.formService.initAuthForm())

  constructor() {
    effect(() => {
      console.log("authForm() : ", this.authForm())
    })
  }

  onSubmit() {

  }
}
