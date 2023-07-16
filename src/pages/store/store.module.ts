import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StorePage } from './store';
import { ComponentsModule } from '../../components/components.module';
import { GoogleMap } from '../../components/google-map/google-map';
import { BackgroundImage } from '../../components/background-image/background-image';
import { Rating } from '../../components/rating/rating';

@NgModule({
  declarations: [
    StorePage, GoogleMap, BackgroundImage, Rating
  ],
  imports: [
    IonicPageModule.forChild(StorePage)
  ],
  entryComponents: [GoogleMap, BackgroundImage, Rating]
})
export class StorePageModule {}
