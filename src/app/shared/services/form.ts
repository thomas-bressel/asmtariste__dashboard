import { Injectable, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Injectable({
  providedIn: 'root'
})
export class Form {

  constructor() { }

  fb = inject(FormBuilder)


  /**
   * Init the login form to register user access
   * @returns 
   */
  initAuthForm(): FormGroup {
    return this.fb.group({
      nickname: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(35)]]
    })
  }


}
