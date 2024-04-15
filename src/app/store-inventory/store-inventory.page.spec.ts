import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreInventoryPage } from './store-inventory.page';

describe('StoreInventoryPage', () => {
  let component: StoreInventoryPage;
  let fixture: ComponentFixture<StoreInventoryPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreInventoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
