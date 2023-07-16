import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Slides, ModalController, PopoverController, ToastController } from 'ionic-angular';
import { AfProvider } from '../../providers/af/af';

/**
 * Generated class for the PralineDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-praline-details',
  templateUrl: 'praline-details.html',
})
export class PralineDetailsPage {
  @ViewChild("idSlide") slides: Slides;
  isReady: boolean;
  isVisible = false;
  // isInPannier: boolean;
  praline : any;
  listPral = [];
  sortPraline : any;
  active_slide_index : number;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public view : ViewController,
    public AfProvider: AfProvider,
    public popoverCtrl: PopoverController,
    public toastCtrl: ToastController) {
      this.listePralines().then((_val)=>{
        this.slidePraline();
      });
  }
  listePralines(){
    return new Promise((resolve, reject)=>{
      this.AfProvider.getPralines().subscribe((_val)=>{
        this.listPral = _val;
        // console.log('Liste Pralines =>', this.sortPraline);
        resolve(_val);
      },(err)=>{
        reject(err);
      });
    });
  }
  /**
  @description Il permet de changer les images sur le slider
  @author Foubia
   */
  slidePraline(){
    this.praline = this.navParams.get('praline');
      // console.log('Praline out =>', this.praline);
      this.active_slide_index = this.praline.id - 1;
    // this.slides.slideTo(active_slide_index, 500);
  }
  getItem(theEvent){
    // console.log('result => ', value);

    let popover = this.popoverCtrl.create('BallotinPersonnaliserPage',{praline : this.praline}, {cssClass: 'custom-popover'});
    let ev = { target : { getBoundingClientRect : () => { return { top: '80' }; } }};   
    popover.present({ev});
        popover.onDidDismiss((data) => {
          if(data){
            console.log('data =>', data);
            this.showPopNumberPralines(data);
              let toast = this.toastCtrl.create({
                message: 'Le Panier a été mise à jour',
                duration: 3000,
                position: 'top'
              });
            
              toast.onDidDismiss(() => {
                console.log('Dismissed toast');
              });
            
              toast.present();
          
          }
        });

      }

  ionViewDidLoad() {
  }

  showPopNumberPralines(ballotin) {
		let popover = this.popoverCtrl.create(
			'PopSelectPralinePage',
			{ data: ballotin, praline: this.praline },
			{ cssClass: 'custom-popuser animated bounceInUp' }
		);
		let ev = {
			target: {
				getBoundingClientRect: () => {
					return { top: '100' };
				}
			}
		};

		popover.onDidDismiss((data) => {

			if (data) {
				
				if (data.isPay!==undefined && data.isPay == true) {
				} else {

					var restant = data.objet.max - data.objet.total;
					if (restant > 0) {
						this.AfProvider.showToast('Il vous reste ' + restant + ' pralines a ajouter');
					} else {
						this.AfProvider.showToast("Votre panier est plein plus d'ajout possible");
					}

					if (data.type == 'next') {
						
            this.AfProvider.showToast('Votre Praline a été ajouté au panier');

          } 
          else {
						this.isReady = false;
					}
				}
			} else {
				this.isReady = false;
				this.isVisible = false;
			}

		});

		popover.present({ ev });
	}
  closeRecharge(){
    this.view.dismiss();
  }
}
