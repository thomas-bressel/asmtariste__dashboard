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

  // Field values
  nicknameValue = signal<string>('');
  passwordValue = signal<string>('');

  constructor() {

    // debug
    effect(() => {
      console.log("authForm() : ", this.authForm())
      console.log("nicknameValue() : ", this.nicknameValue())
      console.log("passwordValue() : ", this.passwordValue())
    })

    effect(() => {
      // Synchronize values with the form groupd
      this.authForm().get('nickname')?.setValue(this.nicknameValue(), { emitEvent: false });
      this.authForm().get('password')?.setValue(this.passwordValue(), { emitEvent: false });
    });

  }


  /**
   * get nickname field values and update signals
   * @param value 
   */
  handleNicknameValueChanged(value: string) {
    this.nicknameValue.set(value);
  }



   /**
   * get password field values and update signals
   * @param value 
   */
  handlePasswordValueChanged(value: string) {
    this.passwordValue.set(value);
  }



  /**
   * 
   */
  onSubmit() {
    if (this.authForm().valid) {
      console.log('Form values:', {
        nickname: this.nicknameValue(),
        password: this.passwordValue()
      });
    }
  }
}
