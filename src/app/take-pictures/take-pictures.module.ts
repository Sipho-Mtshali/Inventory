import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TakePicturesPageRoutingModule } from './take-pictures-routing.module';

import { TakePicturesPage } from './take-pictures.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TakePicturesPageRoutingModule
  ],
  declarations: [TakePicturesPage]
})
export class TakePicturesPageModule {}
