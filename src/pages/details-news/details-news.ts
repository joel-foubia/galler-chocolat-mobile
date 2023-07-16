import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';
import { ApiConfig } from '../../config';

@Component({
  selector: 'page-details-news',
  templateUrl: 'details-news.html',
})
export class DetailsNewsPage {
 
	public actu = null;
	public defaultImage;

  constructor(public navCtrl: NavController, public navParams: NavParams, public socialSharing: SocialSharing) {
  	this.actu = this.navParams.get('actu');
  	this.defaultImage = "assets/images/default.jpg";
  }

  ionViewDidLoad() {
    
  }

  /**
   * Cette fonction permet de partarger
   * une annonce
   **/
  shareNews(){
    // Share via email
    this.socialSharing.share(this.actu.title.rendered, ApiConfig.nom_app, null, this.actu.link).then(() => {
      // Success!
    }).catch(() => {
      // Error!
    });
  }

}
