import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AfProvider } from '../../providers/af/af';

/**
 * Generated class for the CreationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-creation',
  templateUrl: 'creation.html',
})
export class CreationPage {
 
  ballotins: any[];
  constructor(public navCtrl: NavController, public navParams: NavParams, private afServ: AfProvider) {
    this.listBallotins();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreationPage');
  }

  //On récupère la liste des ballotins
  listBallotins(){
    this.afServ.getBallotins().subscribe((_val)=>{
      this.ballotins = _val;
      console.log('Ballotins =>', _val);
    });
  }

  //Ouvre la vue pour sélectionner les Pralines
  makeBallotin(ballotin, event){
    // let segments = event.target.parentNode.children;
		let len = this.ballotins.length;

		for (let i = 0; i < len; i++) {
      if(this.ballotins[i].id!=ballotin.id)
			  this.ballotins[i].won = undefined;
    }
    
    ballotin.won = true;
  }
  
  //Aller à la page des ballotins
  goToPage(ballotin){
    this.navCtrl.push('ShopPage', {'ballotin':ballotin});
  }

}
