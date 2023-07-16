import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PralinesPage } from './pralines';
import { LazyLoadImageModule } from 'ng-lazyload-image';

@NgModule({
  declarations: [
    PralinesPage,
  ],
  imports: [
    IonicPageModule.forChild(PralinesPage), LazyLoadImageModule
  ],
})
export class PralinesPageModule {}
