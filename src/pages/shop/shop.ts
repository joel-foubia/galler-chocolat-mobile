import { Component, ViewChild } from '@angular/core';
import {
	IonicPage,
	NavController,
	NavParams,
	PopoverController,
	Slides,
	AlertController,
	ModalController
} from 'ionic-angular';
import { AfProvider } from '../../providers/af/af';
import { LoginProvider } from '../../providers/login/login';
// import { DragulaService } from 'ng2-dragula';

@IonicPage()
@Component({
	selector: 'page-shop',
	templateUrl: 'shop.html'
})
export class ShopPage {
	@ViewChild('Pralines') slider: Slides;
	isReady: boolean;
	isVisible = false;
	isPanier: boolean;
	pralines: any[];
	ballotin: any;
	dgOpt;
	isInPannier: boolean;

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public alertCtrl: AlertController,
		public modalCtrl: ModalController,
		private afServ: AfProvider,
		private lgServ: LoginProvider,
		public popCtrl: PopoverController
	) {
		this.ballotin = this.navParams.get('ballotin');

		this.listePralines();
	}

	ionViewDidLoad() {
		// console.log('ionViewDidLoad ShopPage');
	}

	//Liste des pralines
	listePralines() {
		this.afServ.getPralines().subscribe((_val) => {
			this.pralines = _val;
			console.log('Pralines =>', _val);
		});
	}

	/**
   * On affiche le panier et puis on envoie
   * braline dans le panier
   */
	showPopUp(praline) {
		this.isPanier = true;

		setTimeout(() => {
			this.isVisible = true;
		}, 500);

		setTimeout(() => {
			this.isInPannier = true;
		}, 850);

		setTimeout(() => {
			this.isReady = true;

			setTimeout(() => {
				this.showPopNumberPralines(praline);
			}, 700);
		}, 1000);
	}

	showConfirm(data) {
		console.log('Data =>', data);
		// this.lgServ.remove('panier');
		const confirm = this.alertCtrl.create({
			cssClass: 'custom-alert',
			message:
				'Vous venez finir de concevoir votre ballotin. Vos achats seront sauvegardés par contre le panier sera vidé',
			buttons: [
				{
					text: 'Choisir un point de livraison',
					handler: () => {
						// this.navCtrl.push('PanierPage', { ballotin: data });
						let panierModal = this.modalCtrl.create('PaniermodalPage', { ballotin: data });
						panierModal.onDidDismiss((result) => {
							if (result) {
								// console.log(result);
								let objet = data.objet;
								objet['myname'] = result.name;
								objet['livraison'] = result.boutique;

								//On sauvegarde le ballotin
								this.buildCustomerInfos(objet);
								this.navCtrl.setRoot('PaymentPage', { ballotin: objet });
							}
						});
						if (data.objet.total >= data.objet.max) {
							panierModal.present();
						} else {
							this.afServ.showMessage('Vous devez completer se ballotin pour passer au payment');
						}
					}
				},
				{
					text: 'Concevoir un autre ballotin',
					handler: () => {
						// this.lgServ.remove('panier');
						this.navCtrl.setRoot('CreationPage');
					}
				}
			]
		});
		confirm.present();
	}

	/**
   * Cette fonction permet d'afficher
   * le Pop up permettant au client de choisir
   * le nombre de Pralines qu'il souhaite mettre dans son panier
   */
	showPopNumberPralines(praline) {
		let popover = this.popCtrl.create(
			'PopSelectPralinePage',
			{ data: this.ballotin, praline: praline },
			{ cssClass: 'custom-popuser animated bounceInUp', enableBackdropDismiss: false }
		);
		let ev = {
			target: {
				getBoundingClientRect: () => {
					return { top: '100' };
				}
			}
		};

		//callback when modal is dismissed (recieve data from View)
		popover.onDidDismiss((data) => {
			if (data) {
				// console.log('Popup dismiss data => ', data);
				if (data.isPay !== undefined && data.isPay == true) {
					this.navCtrl.push('CreationPage');
					this.showConfirm(data);
				} else {
					var restant = data.objet.max - data.objet.total;
					// console.log('restant => ', restant);
					if (restant > 0) {
						this.afServ.showToast('Il vous reste ' + restant + ' pralines a ajouter');
					} else {
						this.afServ.showToast("Votre panier est plein plus d'ajout possible");
						// this.navCtrl.push('CreationPage');
						// this.showConfirm(data);
					}

					if (data.type == 'next') {
						this.isReady = false;
						this.isVisible = false;
						this.isInPannier = false;
						this.slider.slideNext();
					} else {
						this.isReady = false;
						// console.log(data.objet);
						this.showConfirm(data);
						// this.navCtrl.push('Payment', { ballotin: data.objet });
					}
				}
			} else {
				this.isReady = false;
				this.isVisible = false;
			}
		});

		this.lgServ.isTable('panier').then((panier) => {
			if (panier) {
				var ids = [];
				for (let k = 0; k < JSON.parse(panier).length; k++) {
					ids.push(JSON.parse(panier)[k].id_ballotin);
				}

				if (ids.indexOf(this.ballotin.id) > -1) {
					if (JSON.parse(panier)[ids.indexOf(this.ballotin.id)].total >= this.ballotin.max_pralines) {
						this.showConfirm({ objet: JSON.parse(panier)[ids.indexOf(this.ballotin.id)] });
					} else {
						popover.present({ ev });
					}
				} else {
					popover.present({ ev });
				}
			} else {
				popover.present({ ev });
			}
		});
	}

	//Cette fonction permet de construire
	//l'objet structure
	buildCustomerInfos(objet) {
		// let objet = ballotin.objet;
		// objet['myname'] = result.nom;
		// objet['livraison'] = result.boutique;

		this.lgServ.copiedAddSync('my_space', objet);
	}
	goToPanier() {
		this.navCtrl.push('PanierPage');
	}
}
