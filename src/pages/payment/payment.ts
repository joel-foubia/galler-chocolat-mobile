import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-payment',
  templateUrl: 'payment.html',
})
export class PaymentPage {

  ballotin: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public actionSheetCtrl: ActionSheetController) {
    this.ballotin = this.navParams.get('ballotin');
  
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad PaymentPage');
  }

  payment(){

    let actionSheet = this.actionSheetCtrl.create({
      title: 'Choisissez une méthode paiement',
      buttons: [
        {
          text: 'Paypal ou Carte de Crédit',
          // role: 'destructive',
          handler: () => {
            // console.log('Destructive clicked');
          }
        },
        {
          text: 'PayConiq',
          handler: () => {
            // console.log('Archive clicked');
          }
        }
        
      ]
    });
 
    actionSheet.present();
  }

}
