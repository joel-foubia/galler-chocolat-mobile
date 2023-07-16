import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, PopoverController, ModalController } from 'ionic-angular';
import { LoginProvider } from '../../providers/login/login';
import { Storage } from '@ionic/storage';
import { AfProvider } from '../../providers/af/af';

/**
 * Generated class for the PanierPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
	selector: 'page-panier',
	templateUrl: 'panier.html'
})
export class PanierPage {
	cartList;
	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public lgServ: LoginProvider,
		public storage: Storage,
		public ev: Events,
		public modalCtrl: ModalController,
		public af: AfProvider,
		public popCtrl: PopoverController
	) {
		this.lgServ.isTable('panier').then((data) => {
			if (data) this.cartList = JSON.parse(data);
		});

		this.ev.subscribe('cart:mod', (empty) => {});

		this.ev.subscribe('removed:prod', (empty) => {
			this.lgServ.isTable('panier').then((res) => {
				if (res) {
					this.cartList = JSON.parse(res);
				} else {
					this.cartList = undefined;
				}
			});
		});
	}

	ionViewDidLoad() {}

	// increment product qty
	incrementQty(item) {
		/* this.lgServ.isTable('pannier').then((cart) => {
			if (cart) {
				var mycart = [];
				mycart = JSON.parse(cart);
				for (let k = 0; k < cart.length; k++) {
					if (cart[k].id == item.id) {
						mycart[k].qty += 1;
					}
				}
				this.storage.set('mycart', JSON.stringify(mycart)).then(() => {
					this.ev.publish('removed:prod', 'empty');
				});
			}
		}); */
	}

	// decrement product qty
	decrementQty(item) {
		/* this.lgServ.isTable('pannier').then((cart) => {
			if (cart) {
				var mycart = [];
				mycart = JSON.parse(cart);
				for (let k = 0; k < cart.length; k++) {
					if (cart[k].id == item.id) {
						if (item.qty - 1 < 1) {
							mycart[k].qty = 1;
						} else {
							// item.qty -= 1;
							mycart[k].qty -= 1;
						}
						// mycart[k].qty += 1;
					}
				}
				this.storage.set('mycart', JSON.stringify(mycart)).then(() => {
					this.ev.publish('removed:prod', 'empty');
				});
			}
		}); */
	}

	removeFromCart(p) {
		this.af.removeFromCart(p);
	}

	placeOrder(ballotin) {
		let panierModal = this.modalCtrl.create('PaniermodalPage', { ballotin: ballotin });
		if (ballotin.total >= ballotin.max) {
			panierModal.present();
		} else {
			this.af.showMessage('Vous devez completer se ballotin pour passer au payment');
		}
	}

	goToDetail(item) {
		let popover = this.popCtrl.create(
			'PanierpopPage',
			{ data: item },
			{ cssClass: 'custom-popuser animated bounceInUp' }
		);
		popover.present();

		popover.onDidDismiss((data) => {
			this.lgServ.isTable('panier').then((res) => {
				if (res) {
					this.cartList = JSON.parse(res);
				} else {
					this.cartList = undefined;
				}
			});
		});
	}
}
