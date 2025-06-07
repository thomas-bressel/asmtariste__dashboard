import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { Button } from './button';

describe('Button', () => {
  let component: Button;
  let fixture: ComponentFixture<Button>;
  let buttonElement: HTMLButtonElement;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Button]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Button);
    component = fixture.componentInstance;
    fixture.detectChanges(); 
    debugElement = fixture.debugElement;
    buttonElement = debugElement.query(By.css('button')).nativeElement;
  });



  describe('Component Creation', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });



  describe('Input Properties', () => {
    it('should display text when text input is provided', () => {
      // Arrange
      fixture.componentRef.setInput('text', 'Cliquez ici');
      fixture.detectChanges();

      // Act
      const textSpan = buttonElement.querySelector('.btn__text');

      // Assert
      expect(textSpan?.textContent?.trim()).toBe('Cliquez ici');
    });
  });



  describe('Icon Display', () => {
    it('should not display icon when icon input is empty', () => {
      // Act
      const iconImg = buttonElement.querySelector('.btn__icn');

      // Assert
      expect(iconImg).toBeNull();
    });

    it('should display icon when icon and iconColor inputs are provided', () => {
      // Arrange
      fixture.componentRef.setInput('icon', 'user');
      fixture.componentRef.setInput('iconColor', 'blue');
      fixture.detectChanges();

      // Act
      const iconImg = buttonElement.querySelector('.btn__icn') as HTMLImageElement;

      // Assert
      expect(iconImg).toBeTruthy();
      expect(iconImg.src).toContain('assets/svg/blue/user');
    });

  });




  describe('Image Display', () => {
    it('should not display image when img input is empty', () => {
      // Act
      const logoImg = buttonElement.querySelector('.btn__img');

      // Assert
      expect(logoImg).toBeNull();
    });

    it('should display image when img input is provided', () => {
      // Arrange
      fixture.componentRef.setInput('img', 'company-logo');
      fixture.detectChanges();

      // Act
      const logoImg = buttonElement.querySelector('.btn__img') as HTMLImageElement;

      // Assert
      expect(logoImg).toBeTruthy();
      expect(logoImg.src).toContain('assets/logos/company-logo.webp');
    });
  });

 

  describe('Combined Features', () => {
    it('should display both icon and text together', () => {
      // Arrange
      fixture.componentRef.setInput('icon', 'save');
      fixture.componentRef.setInput('iconColor', 'white');
      fixture.componentRef.setInput('text', 'Sauvegarder');
      fixture.detectChanges();

      // Act
      const iconImg = buttonElement.querySelector('.btn__icn');
      const textSpan = buttonElement.querySelector('.btn__text');

      // Assert
      expect(iconImg).toBeTruthy();
      expect(textSpan?.textContent?.trim()).toBe('Sauvegarder');
    });

    it('should display both image and text together', () => {
      // Arrange
      fixture.componentRef.setInput('img', 'logo');
      fixture.componentRef.setInput('text', 'Se connecter');
      fixture.detectChanges();

      // Act
      const logoImg = buttonElement.querySelector('.btn__img');
      const textSpan = buttonElement.querySelector('.btn__text');

      // Assert
      expect(logoImg).toBeTruthy();
      expect(textSpan?.textContent?.trim()).toBe('Se connecter');
    });
  });



  

});
