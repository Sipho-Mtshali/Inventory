import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpdateInventoryPage } from './update-inventory.page';

describe('UpdateInventoryPage', () => {
  let component: UpdateInventoryPage;
  let fixture: ComponentFixture<UpdateInventoryPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateInventoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
