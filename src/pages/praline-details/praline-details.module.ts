import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PralineDetailsPage } from './praline-details';
import { LazyLoadImageModule } from 'ng-lazyload-image';

@NgModule({
  declarations: [
    PralineDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(PralineDetailsPage), LazyLoadImageModule
  ],
})
export class PralineDetailsPageModule {}
