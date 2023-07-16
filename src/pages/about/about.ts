import { Component } from '@angular/core';
import { NavController, LoadingController, IonicPage } from 'ionic-angular';
import { AfProvider } from '../../providers/af/af';
import { ImageProvider } from '../../providers/image/image';
import { LoginProvider } from '../../providers/login/login';
// import { OdooProvider } from '../../providers/odoo/odoo';

@IonicPage()
@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})
export class AboutPage {

  public params : any = {data:{}, events:{}};
  //public isAbout = false;

  constructor(public navCtrl: NavController, private servAF: AfProvider, private imgServ: ImageProvider, public loadCtrl: LoadingController, private lgServ: LoginProvider) {

  	  this.displayAbout();
      let txtMessage = "Impossible d'ouvrir le lien, Cette adresse n'existe pas. ";

        this.params.events =  {
            onFacebook: function(item) {
                //console.log(item.parameter);
                lgServ.doWebsite(item.parameter, txtMessage);
            },
            onTwitter: function(item: any) {
                lgServ.doWebsite(item.parameter, txtMessage);
            },
            onInstagram: function(item: any) {
                lgServ.doWebsite(item.parameter, txtMessage);
            },
            onLinkedIn: function(item: any) {
                lgServ.doWebsite(item.parameter, txtMessage);
            },
            onGoogle: function(item: any) {
                lgServ.doWebsite(item.parameter, txtMessage);
            }
        };
  }

  ionViewDidLoad() {}

  displayAbout(){

    // let loading = this.loadCtrl.create({content: 'Un peu de patience...'});
    // loading.present();

  	this.servAF.getInfosAbout((res)=>{
  		
  		this.params.data = {
            iconLike: 'icon-thumb-up',
            iconFavorite: 'icon-heart',
            iconShare: 'icon-share-variant',
            title: res.name,
            titleDescription: res.compagnyDescription,
            contentTitle: res.product,
            versionName: res.version,
            contentDescription: res.productDescription,
            iconLoacation: 'icon-map-marker-radius',
            iconLoacationText: res.address,
            postalCode: res.postalCode+", "+res.city,
            iconFace: 'assets/icon/fb.png',
            iconFaceText: res.facebookPage,
            iconGoogle: 'assets/icon/googleplus.png',
            iconGoogleText: res.googleplusPage,
            iconInstagram: 'assets/icon/instagram.png',
            iconInstagramText: res.instagramPage,
            iconLinkedIn: 'assets/icon/linkedin.png',
            iconLinkedInText: res.linkedinPage,
            iconPhone: 'icon-phone',
            iconPhoneText: res.phoneNumber,
            iconEarth: 'assets/icon/twitter.png',
            iconEarthText: res.twitterPage,
            iconEmail: 'icon-email-outline',
            iconEmailText: res.email,
            iconWeb: 'icon-earth',
            iconWebText: res.website,
            copyright: res.copyright,
            
            // map: {
            //     lat: res.map.origin.latitude,
            //     lng: res.map.origin.longitude,
            //     zoom: res.map.zoomLevel,
            //     mapTypeControl: true,
            //     streetViewControl: true,
            // }
        };

        //Mettre à jour le logo
        this.imgServ.getCallbackURL(res.logo, (res)=>{
             //console.log(res);
             this.params.data['logo'] = res;
             
          });

        

        //loading.dismiss();
  	});
  }



}
