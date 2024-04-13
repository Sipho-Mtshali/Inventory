import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewInventoryPageRoutingModule } from './view-inventory-routing.module';

import { ViewInventoryPage } from './view-inventory.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewInventoryPageRoutingModule
  ],
  declarations: [ViewInventoryPage]
})
export class ViewInventoryPageModule {}
