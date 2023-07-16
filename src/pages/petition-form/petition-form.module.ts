import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PetitionFormPage } from './petition-form';

@NgModule({
  declarations: [
    PetitionFormPage,
  ],
  imports: [
    IonicPageModule.forChild(PetitionFormPage),
  ],
})
export class PetitionFormPageModule {}
