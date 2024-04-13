import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateInventoryPageRoutingModule } from './update-inventory-routing.module';

import { UpdateInventoryPage } from './update-inventory.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdateInventoryPageRoutingModule
  ],
  declarations: [UpdateInventoryPage]
})
export class UpdateInventoryPageModule {}
