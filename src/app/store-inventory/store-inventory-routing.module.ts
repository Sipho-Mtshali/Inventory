import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StoreInventoryPage } from './store-inventory.page';

const routes: Routes = [
  {
    path: '',
    component: StoreInventoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StoreInventoryPageRoutingModule {}
