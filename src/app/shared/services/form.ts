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



  initCreateTagForm(): FormGroup {
    return this.fb.group({
      label: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
      color: [''],
      background_color: [''],
      border_color: [''],
    });
  }










  public textColor = [
    { value: "color-red", label: "🔴 Rouge" },
    { value: "color-blue", label: "🔵 Bleu" },
    { value: "color-green", label: "🟢 Vert" },
    { value: "color-yellow", label: "🟡 Jaune" },
    { value: "color-orange", label: "🟠 Orange" },
    { value: "color-purple", label: "🟣 Violet" },
    { value: "color-black", label: "⚫ Noir" },
    { value: "color-white", label: "⚪ Blanc" },
    { value: "color-brown", label: "🟤 Marron" }
  ];


  public backgroundColor = [
    { value: "background-red", label: "🔴 Rouge" },
    { value: "background-blue", label: "🔵 Bleu" },
    { value: "background-green", label: "🟢 Vert" },
    { value: "background-yellow", label: "🟡 Jaune" },
    { value: "background-orange", label: "🟠 Orange" },
    { value: "background-purple", label: "🟣 Violet" },
    { value: "background-black", label: "⚫ Noir" },
    { value: "background-white", label: "⚪ Blanc" },
    { value: "background-brown", label: "🟤 Marron" }
  ];

  public borderColor = [
    { value: "border-red", label: "🔴 Rouge" },
    { value: "border-blue", label: "🔵 Bleu" },
    { value: "border-green", label: "🟢 Vert" },
    { value: "border-yellow", label: "🟡 Jaune" },
    { value: "border-orange", label: "🟠 Orange" },
    { value: "border-purple", label: "🟣 Violet" },
    { value: "border-black", label: "⚫ Noir" },
    { value: "border-white", label: "⚪ Blanc" },
    { value: "border-brown", label: "🟤 Marron" }
  ];

}
