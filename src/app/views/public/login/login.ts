// angular imports
import { Component, inject, signal, effect } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

// services imports
import { Form } from '@services/form'
import { Button } from 'src/app/components/ui/button/button';
import { Auth } from '@services/auth';
import { Notification } from '@services/notification';
import { Loading } from '@services/loading';

// component imports
import { InputField } from 'src/app/components/ui/input-field/input-field';


@Component({
  selector: 'main[app-login]',
  host: {
    'class': 'login'
  },
  imports: [ReactiveFormsModule, InputField, Button],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {

  // Dependencies injection
  private formService = inject(Form);
  private authService = inject(Auth);
  private loadingService = inject(Loading);
  private notificationService = inject(Notification);

  // Form state
  authForm = signal<FormGroup>(this.formService.initAuthForm())

  // Field values
  nicknameValue = signal<string>('');
  passwordValue = signal<string>('');

  constructor() {
    effect(() => {
      // Synchronize values with the form groupd
      this.authForm().get('nickname')?.setValue(this.nicknameValue(), { emitEvent: false });
      this.authForm().get('password')?.setValue(this.passwordValue(), { emitEvent: false });
    });
    
    this.loadingService.isLoading.set(false);
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
   * Submit form data to the api
   */
  async onSubmit() {

    if (this.authForm().valid) {
      this.loadingService.show();
      const { nickname, password } = this.authForm().value;

      // FormData encoding params
      const formData = new URLSearchParams();
      formData.append('nickname', nickname);
      formData.append('password', password);
      try {
        const response = await this.authService.createSession(formData);
        const data = await response.json();

        if (!response.ok) {
          this.notificationService.configNotification('red');
          this.notificationService.displayNotification(data.message || 'Erreur de connexion', 3000, null, 'server', false);
          this.loadingService.hide();
          return;
        }
        this.notificationService.configNotification('green');
        this.notificationService.displayNotification("LOGIN_SUCCESS", 2000, 'dashboard', 'client', false);
        this.authService.setTokens(data.sessionToken, data.refreshToken);      

      } catch (error) {
        this.loadingService.hide();
        console.error('Login error:', error);
      }
    }
  }
}
