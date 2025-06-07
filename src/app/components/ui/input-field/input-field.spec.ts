import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { InputField } from './input-field';

describe('InputField', () => {
  let component: InputField;
  let fixture: ComponentFixture<InputField>;
  let debugElement: DebugElement;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputField]
    })
      .compileComponents();

    fixture = TestBed.createComponent(InputField);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });



  describe('Input Properties', () => {
    it('should update inputs correctly', () => {
      fixture.componentRef.setInput('icon', 'user');
      fixture.componentRef.setInput('placeholder', 'Entrez votre nom');
      fixture.componentRef.setInput('label', 'username');
      fixture.componentRef.setInput('type', 'text');
      fixture.componentRef.setInput('name', 'username');
      fixture.componentRef.setInput('minlength', '3');
      fixture.componentRef.setInput('maxlength', '20');
      fixture.detectChanges();

      expect(component.icon()).toBe('user');
      expect(component.placeholder()).toBe('Entrez votre nom');
      expect(component.label()).toBe('username');
      expect(component.type()).toBe('text');
      expect(component.name()).toBe('username');
      expect(component.minlength()).toBe('3');
      expect(component.maxlength()).toBe('20');
    });
  });



  describe('Effects and Computed Signals', () => {
    it('should sync currentType with type input via effect', () => {
      fixture.componentRef.setInput('type', 'password');
      fixture.detectChanges();

      expect(component.currentType()).toBe('password');
    });

    it('should sync currentIcon with icon input via effect', () => {
      fixture.componentRef.setInput('icon', 'eye-on');
      fixture.detectChanges();

      expect(component.currentIcon()).toBe('eye-on');
    });


    it('should update internal signals when inputs change', () => {
      // 1st change
      fixture.componentRef.setInput('type', 'text');
      fixture.componentRef.setInput('icon', 'user');
      fixture.detectChanges();

      expect(component.currentType()).toBe('text');
      expect(component.currentIcon()).toBe('user');

      // Second change
      fixture.componentRef.setInput('type', 'password');
      fixture.componentRef.setInput('icon', 'eye-on');
      fixture.detectChanges();

      expect(component.currentType()).toBe('password');
      expect(component.currentIcon()).toBe('eye-on');
    });

  });


  describe('Computed Signals', () => {
    it('should compute isPasswordField as false for non-password labels', () => {
      fixture.componentRef.setInput('label', 'username');
      fixture.detectChanges();

      expect(component.isPasswordField()).toBe(false);
    });

    it('should compute isPasswordField as true for password label', () => {
      fixture.componentRef.setInput('label', 'password');
      fixture.detectChanges();

      expect(component.isPasswordField()).toBe(true);
    });

    it('should update isPasswordField when label changes', () => {
      // notpassword
      fixture.componentRef.setInput('label', 'email');
      fixture.detectChanges();
      expect(component.isPasswordField()).toBe(false);

      // then password
      fixture.componentRef.setInput('label', 'password');
      fixture.detectChanges();
      expect(component.isPasswordField()).toBe(true);

      // and finally back to not a password
      fixture.componentRef.setInput('label', 'username');
      fixture.detectChanges();
      expect(component.isPasswordField()).toBe(false);
    });
  });


  

});
