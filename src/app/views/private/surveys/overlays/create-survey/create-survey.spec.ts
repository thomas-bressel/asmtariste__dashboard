import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSurvey } from './create-survey';

describe('CreateSurvey', () => {
  let component: CreateSurvey;
  let fixture: ComponentFixture<CreateSurvey>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateSurvey]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateSurvey);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
