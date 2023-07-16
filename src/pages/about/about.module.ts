import { LazyLoadImageModule } from 'ng-lazyload-image';
import { MapsLayout2 } from './../../components/maps/layout-2/maps-layout-2';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AboutPage } from './about';
//import { AgmCoreModule } from 'angular2-google-maps/core';

@NgModule({
  declarations: [
   AboutPage,
   MapsLayout2
  ],
  imports: [
    IonicPageModule.forChild(AboutPage),
    LazyLoadImageModule
    //AgmCoreModule
  ],
  
  entryComponents:[
   MapsLayout2
  ]
})
export class AboutPageModule {}
