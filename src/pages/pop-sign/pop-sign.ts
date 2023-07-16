import { Component} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { ApiConfig } from '../../config';


@Component({
  selector: 'page-pop-sign',
  templateUrl: 'pop-sign.html',
})
export class PopSignPage {

  public progress;
  public max;
  public current = 0;
  public isSpinner;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

  	this.max = ApiConfig.Max_Petition;
  	this.current = this.navParams.get('current');
  	this.totalPetition();
  	
  }

  ionViewDidLoad() {}

  //Cette fonction est appelé pour lister
  //le nombre de signatures de la pétition
  totalPetition(){
  	
  	this.isSpinner = true;
    this.progress = Math.ceil((this.current/this.max)*100); 
  }

}
