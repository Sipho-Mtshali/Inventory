import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewPickedPageRoutingModule } from './view-picked-routing.module';

import { ViewPickedPage } from './view-picked.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewPickedPageRoutingModule
  ],
  declarations: [ViewPickedPage]
})
export class ViewPickedPageModule {}
