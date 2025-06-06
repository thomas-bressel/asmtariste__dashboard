import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticlePages } from './article-pages';

describe('ArticlePages', () => {
  let component: ArticlePages;
  let fixture: ComponentFixture<ArticlePages>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArticlePages]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArticlePages);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
