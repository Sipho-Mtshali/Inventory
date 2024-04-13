import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewInventoryPage } from './view-inventory.page';

describe('ViewInventoryPage', () => {
  let component: ViewInventoryPage;
  let fixture: ComponentFixture<ViewInventoryPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewInventoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
