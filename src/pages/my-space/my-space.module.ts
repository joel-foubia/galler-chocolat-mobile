import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MySpacePage } from './my-space';

@NgModule({
  declarations: [
    MySpacePage,
  ],
  imports: [
    IonicPageModule.forChild(MySpacePage),
  ],
})
export class MySpacePageModule {}
