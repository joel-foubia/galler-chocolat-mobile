import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShopPage } from './shop';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { DragulaModule } from 'ng2-dragula';

@NgModule({
  declarations: [
    ShopPage,
  ],
  imports: [
    IonicPageModule.forChild(ShopPage), LazyLoadImageModule, DragulaModule
  ],
})
export class ShopPageModule {}
