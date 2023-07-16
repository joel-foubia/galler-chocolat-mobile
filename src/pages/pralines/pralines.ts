import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AfProvider } from '../../providers/af/af';
import { ModalController, ViewController } from 'ionic-angular';

/**
 * Generated class for the PralinesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pralines',
  templateUrl: 'pralines.html',
})
export class PralinesPage {
  pralines: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public AfProvider: AfProvider,
    public modalCtrl : ModalController) {
      this.listePralines();
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad PralinesPage');
  }
  listePralines(){
    this.AfProvider.getPralines().subscribe((_val)=>{
      this.pralines = _val;
      // console.log('Pralines =>', _val);
    });
  }
  pralineDetails(_value){
    let profileModal = this.modalCtrl.create('PralineDetailsPage',{praline : _value});
        profileModal.onDidDismiss(data => {
          // console.log(data);
        });
        profileModal.present();
  }

}
