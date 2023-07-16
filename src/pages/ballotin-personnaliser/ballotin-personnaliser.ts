import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { AfProvider } from '../../providers/af/af';
import { Storage } from '@ionic/storage';
import { LoginProvider } from '../../providers/login/login';

/**
 * Generated class for the BallotinPersonnaliserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ballotin-personnaliser',
  templateUrl: 'ballotin-personnaliser.html',
})
export class BallotinPersonnaliserPage {
  ballotins: any[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public view: ViewController,
    public afServ: AfProvider,
    public storage: Storage,
    public lgServ: LoginProvider,
    public vc : ViewController) {
      this.listBallotins();
      
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BallotinPersonnaliserPage');
  }
  closeRecharge(){
    this.view.dismiss();
  }
  listBallotins(){
    this.afServ.getBallotins().subscribe((_val)=>{
      this.ballotins = _val;
      console.log('Ballotins =>', _val);
    });
  }
  getBallotin(value){
    this.vc.dismiss(value);
   
  }
}
