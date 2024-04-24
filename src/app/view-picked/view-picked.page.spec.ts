import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewPickedPage } from './view-picked.page';

describe('ViewPickedPage', () => {
  let component: ViewPickedPage;
  let fixture: ComponentFixture<ViewPickedPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPickedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
