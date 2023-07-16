import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, ViewController } from 'ionic-angular';
import { LoginProvider } from '../../providers/login/login';
import { Storage } from '@ionic/storage';
import { AfProvider } from '../../providers/af/af';

/**
 * Generated class for the PanierpopPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
	selector: 'page-panierpop',
	templateUrl: 'panierpop.html'
})
export class PanierpopPage {
	ballotin;
	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public lgServ: LoginProvider,
		public af: AfProvider,
		public storage: Storage,
		public vc: ViewController,
		public ev: Events
	) {
		this.ballotin = navParams.get('data');
		console.log('Ballotin =>', this.ballotin);

		this.ev.subscribe('cart:mod', (empty) => {});

		this.ev.subscribe('removed:prod', (empty) => {
			/* 	this.lgServ.isTable('panier').then((res) => {
				if (res) {
					this.cartList = JSON.parse(res);
				} else {
					this.cartList = [];
				}
			}); */
		});
	}

	ionViewDidLoad() {}

	decrementQty(item) {
		this.lgServ.isTable('panier').then((cart) => {
			if (cart) {
				var mycart = [];
				mycart = JSON.parse(cart);
				for (let k = 0; k < JSON.parse(cart).length; k++) {
					if (JSON.parse(cart)[k].id == this.ballotin.id) {
						for (let j = 0; j < JSON.parse(cart)[k].pralines.length; j++) {
							if (JSON.parse(cart)[k].pralines[j].id == item.id) {
								if (item.quantite - 1 < 1) {
									mycart[k].pralines[j].quantite = 1;
									mycart[k].total = 1;
									item.quantite = 1;
								} else {
									mycart[k].pralines[j].quantite -= 1;
									item.quantite -= 1;
									mycart[k].total -= 1;
								}
							}
						}
					}
				}
				this.storage.set('panier', JSON.stringify(mycart)).then(() => {
					this.ev.publish('removed:prod', 'empty');
				});
			}
		});
	}

	incrementQty(item) {
		this.lgServ.isTable('panier').then((cart) => {
			if (cart) {
				var mycart = [];
				mycart = JSON.parse(cart);
				for (let k = 0; k < JSON.parse(cart).length; k++) {
					if (JSON.parse(cart)[k].id == this.ballotin.id) {
						for (let j = 0; j < JSON.parse(cart)[k].pralines.length; j++) {
							if (JSON.parse(cart)[k].pralines[j].id == item.id) {
								mycart[k].pralines[j].quantite += 1;
								item.quantite += 1;
								mycart[k].total += 1;
							}
						}
					}
				}
				this.storage.set('panier', JSON.stringify(mycart)).then(() => {
					this.ev.publish('removed:prod', 'empty');
				});
			}
		});
	}

	removeFromCart(item) {
		this.af.removePralinsFromBallotin(item, this.ballotin);

		for (let i = 0; i < this.ballotin.pralines.length; i++) {
			if (this.ballotin.pralines[i].id == item.id) {
				if (this.ballotin.pralines.length > 1) {
					this.ballotin.pralines.splice(i, 1);
				} else {
					this.af.showMessage('Vous devez avoir au moins 1 pralin dans votre ballotin');
				}
			}
		}
	}
}
