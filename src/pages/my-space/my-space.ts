import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginProvider } from '../../providers/login/login';


@IonicPage()
@Component({
  selector: 'page-my-space',
  templateUrl: 'my-space.html',
})
export class MySpacePage {

  ballotins = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, private lgServ: LoginProvider) {
    this.getBallotins();
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad MySpacePage');
  }

  getBallotins(){
    this.lgServ.isTable('my_space').then(res=>{
        if(res){
          this.ballotins =  JSON.parse(res);
        }
    });
  }

  toggleSection(i) {
    this.ballotins[i].open = !this.ballotins[i].open;
  }

  goToCreation(){
    this.navCtrl.push("CreationPage");
  }

}
