import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TakePicturesPage } from './take-pictures.page';

describe('TakePicturesPage', () => {
  let component: TakePicturesPage;
  let fixture: ComponentFixture<TakePicturesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TakePicturesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
