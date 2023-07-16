import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreationPage } from './creation';
import { LazyLoadImageModule } from 'ng-lazyload-image';

@NgModule({
  declarations: [
    CreationPage,
  ],
  imports: [
    IonicPageModule.forChild(CreationPage), LazyLoadImageModule
  ],
})
export class CreationPageModule {}
