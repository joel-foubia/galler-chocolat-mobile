import { Injectable } from '@angular/core';
import { ToastController, Events } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireOfflineDatabase } from 'angularfire2-offline/database';
import { LoginProvider } from '../login/login';
import { Storage } from '@ionic/storage';

@Injectable()
export class AfProvider {
	private items: any;
	private userInfos: any;

	constructor(
		private afDB: AngularFireDatabase,
		public ev: Events,
		public storage: Storage,
		public toastCtrl: ToastController,
		private lgServ: LoginProvider,
		private offServ: AngularFireOfflineDatabase
	) {
		//console.log('Hello AfProvider Provider');
	}

	/**
   * Cette fonction va vérifier que
   * cette utilisateur est bien enregistré
   * dans la BD
   *
   * @return callback
   *
   **/
	retrieveURL(callback) {
		return this.afDB.list('/galler/server').subscribe((_data) => {
			for (var i in _data) {
				let current = _data[i];

				if (current.$key == 'url') {
					callback({ url: current.$value });
					break;
				}
			}
		});
	}

	/**
   * Cette fonction va vérifier que
   * cette utilisateur est bien enregistré
   * dans la BD
   *
   * @return callback
   *
   **/
	retrievepaypalCredits(callback) {
		// console.log('retrieving payPal');

		return this.afDB.list('/galler/config').subscribe((_data) => {
			let result = {};

			for (var i in _data) {
				let current = _data[i];
				let key = current.$key;
				result[key] = current.$value;
			}

			callback(result);
		});
	}

	/**
   * Function pour recuperer tout les donnees de l'app sur firebase
   */
	retrieveFireBaseData(callback) {
		return this.afDB.list('/galler').subscribe((_data) => {
			// console.log('Da => ', _data);
			let result = {};
			let array = [];
			array = _data;
			/* for (var i in _data) {
					let current = _data[i];
				let key = current.$key;
        result[key] = current.$value;
				if (_data[i].$key == 'functions') {
					array[i] = _data[i].$value;
				}
      } */
			for (let j = 0; j < _data.length; j++) {
				if (_data[j].$key == 'functions') {
					console.log(_data[j].$value);
					array[j] = _data[j].$value;
				}
			}

			callback(array);
		});
	}

	/***
   * Cette fonction permet d'afficher
   * les informations A Propos de l'entreprise
   *
   **/
	getInfosAbout(callback) {
		return this.offServ.list('/galler/about').subscribe((_data) => {
			let result = {};

			for (var i in _data) {
				let current = _data[i];
				let key = current.$key;

				if (key == 'map') {
					result['map'] = current;
				} else {
					result[key] = current.$value;
				}
			}
			callback(result);
		});
	}

	/**
   * Cette fonction permet de récupérer
   * le message de Bienvenue
   *
   **/
	getWelcomeMessage(callback) {
		return this.offServ.list('/galler/welcome_message').subscribe((_data) => {
			callback(_data);
		});
	}

	/***
   * Cette fonction permet de récupérer
   * l'objet Image in background
   *
   **/
	getImgSplashScreen(callback) {
		return this.offServ.list('/galler/start').subscribe((_data) => {
			callback(_data[0]);
		});
	}

	/***
   * Cette fonction permet de récupérer
   * les fonctionnalités principales de l'app mobile
   *
   **/
	getListFonctions(callback) {
		return this.offServ.list('/galler/fonctions').subscribe((_data) => {
			//this.lgServ.setTable('fonctions_ona', _data);
			callback(_data);
		});
	}

	/**
   * Cette fonction permet de récupérer
   * la liste des boutiques
   *
   **/
	getBoutiques() {
		return this.afDB.list('/galler/boutiques');
	}

	/**
   * Cette fonction permet de récupérer
   * la liste des pralines
   *
   **/
	getPralines() {
		return this.offServ.list('/galler/pralines');
	}

	/**
   * Cette fonction permet de récupérer
   * la liste des pralines
   *
   **/
	getBallotins() {
		return this.offServ.list('/galler/ballotins');
	}

	//Cette fonction permet d'obtenir le menu principal (les catégories populaire)
	getMainMenu() {
		return this.offServ.list('/galler/mainmenu');
	}

	removePralinsFromBallotin(p, ballo) {
		if (ballo.pralines.length > 1) {
			this.storage.get('panier').then((cart) => {
				if (cart) {
					var unlike = [];
					unlike = JSON.parse(cart);

					for (let i = 0; i < unlike.length; i++) {
						if (unlike[i].id == ballo.id) {
							for (let j = 0; j < unlike[i].pralines.length; j++) {
								if (unlike[i].pralines[j].id == p.id) {
									unlike[i].pralines.splice(j, 1);
									unlike[i].total = unlike[i].total - p.quantite;
								}
							}
						}
						this.storage.set('panier', JSON.stringify(unlike)).then(() => {
							this.showMessage('Pralin retirer');
							this.ev.publish('cart:mod', 'empty');
							this.ev.publish('removed:prod', 'empty');
						});
					}
				}
			});
		}
	}

	/** Cette fonction permet de retirer
	* un produit au panier
	* @param prod Objet, le produit en question
	**/
	removeFromCart(p) {
		this.storage.get('panier').then((cart) => {
			if (cart) {
				var unlike = [];
				unlike = JSON.parse(cart);
				for (let j = 0; j < unlike.length; j++) {
					if (unlike[j].id == p.id) {
						unlike.splice(j, 1);
					}
				}
				console.log('Sliced cart', unlike);
				if (unlike.length === 0) {
					this.storage.remove('panier').then(() => {
						this.showMessage('Retirer du Panier');
						this.ev.publish('cart:mod', 'empty');
						this.ev.publish('removed:prod', 'empty');
					});
				} else {
					this.storage.set('panier', JSON.stringify(cart)).then(() => {
						this.showMessage('Retirer du Panier');
						this.ev.publish('cart:mod', 'empty');
						this.ev.publish('removed:prod', 'empty');
					});
				}
			}
		});
	}

	//Cette fonction permet d'afficher un message
	// en cas d'erreur ou de success
	showMessage(msg) {
		let toast = this.toastCtrl.create({
			message: msg,
			duration: 3000,
			cssClass: 'toastErr',
			position: 'top'
		});

		toast.present();
	}

	showMessageWithBtn(msg) {
		let toast = this.toastCtrl.create({
			message: msg,
			showCloseButton: true,
			cssClass: 'toastErr',
			closeButtonText: 'OK',
			position: 'top'
		});

		toast.present();
	}
	showToast(msg) {
		let toast = this.toastCtrl.create({
			message: msg,
			// showCloseButton: true,
			duration: 3000,
			// closeButtonText: 'OK',
			position: 'top'
		});

		toast.present();
	}
}
