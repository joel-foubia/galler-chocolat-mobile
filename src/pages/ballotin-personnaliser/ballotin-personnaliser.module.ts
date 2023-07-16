import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BallotinPersonnaliserPage } from './ballotin-personnaliser';

@NgModule({
  declarations: [
    BallotinPersonnaliserPage,
  ],
  imports: [
    IonicPageModule.forChild(BallotinPersonnaliserPage),
  ],
})
export class BallotinPersonnaliserPageModule {}
