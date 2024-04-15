import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StoreInventoryPageRoutingModule } from './store-inventory-routing.module';

import { StoreInventoryPage } from './store-inventory.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StoreInventoryPageRoutingModule
  ],
  declarations: [StoreInventoryPage]
})
export class StoreInventoryPageModule {}
