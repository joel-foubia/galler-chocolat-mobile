import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavParams, ViewController, Slides } from 'ionic-angular';
import { LoginProvider } from '../../providers/login/login';
import { AfProvider } from '../../providers/af/af';

@IonicPage()
@Component({
	selector: 'page-pop-select-praline',
	templateUrl: 'pop-select-praline.html'
})
export class PopSelectPralinePage {
	
	residual: number = 0;
	currentShop: any;
	dumpPralines = [];
	leftPralines: number;
	@ViewChild('numb') slider: Slides;

	nbSelected: any;
	showCheckout: boolean;
	isPay: boolean;
	isVisible: boolean = false;
	tabNumbers = [];
	ballotin: any;
	totalSelected: any = 0;
	sel_praline: any;

	constructor(
		public navParams: NavParams,
		public vc: ViewController,
		private lgServ: LoginProvider,
		private afServ: AfProvider
	) {

		this.ballotin = this.navParams.get('data');
		this.sel_praline = this.navParams.get('praline');
		// console.log('My Ballotin =>', this.ballotin);
		// console.log('Sel praline =>', this.sel_praline);
		this.buildTab();

		this.lgServ.isTable('panier').then((res) => {
			if (res) {
				let listObjPanier = JSON.parse(res);

				console.log('My Panier =>', listObjPanier);

				for (let i = 0; i < listObjPanier.length; i++) {
					const element = listObjPanier[i];
					if (element.id_ballotin == this.ballotin.id) {
						this.totalSelected = element.total;
						this.currentShop = element;
						break;
					}
				}
				//End of loop
			}

			this.residual = this.ballotin.max_pralines - this.totalSelected;
		});

		console.log('Total selected =>', this.totalSelected);
	}

	//On construit le tableau le nombre
	//de pralines qui sera choisit par le user
	buildTab() {
		
		for (let i = 1; i <= this.ballotin.max_pralines; i++) {
			this.tabNumbers.push(i);
		}
	}

	ionViewDidLoad() {
		// console.log('ionViewDidLoad PopSelectPralinePage');
	}

	//On ferme le Pop up
	close() {
		this.vc.dismiss();
	}

	//Selection nombre
	selectUnit(item) {
		console.log('Max pral', this.ballotin.max_pralines);
		console.log('Total sel', this.totalSelected);
		console.log('Item sel', item);
		let len = this.tabNumbers.length;

		for (let i = 0; i < len; i++) {
			if (this.tabNumbers[i] == item) {
				this.isVisible = true;
				break;
			}
		}

		if (this.ballotin.max_pralines > this.totalSelected) this.nbSelected = item;
		else {
			this.afServ.showMessage('Le nombre maximale de pralines choisit a été atteind');
			this.isPay = true;
		}
	}

	confirm() {
		/* if (this.nbSelected == undefined) {
			this.afServ.showMessage('Veuillez selectioner un nombre de pralins pour continuer');
		} else { */
		this.showCheckout = true;
		this.totalSelected += this.nbSelected;
		this.leftPralines = this.ballotin.max_pralines - this.totalSelected;
		// }
	}

	/**
   * Cette méthode permettra de sauvegarder le nombre de praline choisit
   * et de continuer à la praline suivante
   */
	goToNextPraline() {

		let id_custom_ballotin, ballo, is_exist = false;
		let praline = [];

		/* if(this.currentShop===undefined)
			praline = [];
		else
			praline = this.currentShop.pralines; */

		if (this.totalSelected >= this.ballotin.max_pralines) {
			this.totalSelected = this.ballotin.max_pralines;
		}

		for (let k = 0; k < praline.length; k++) {
			if (praline[k].id== this.sel_praline){
				praline[k].quantite = this.nbSelected;
				is_exist = true;
				break;
			}
		}

		//On insère dans la table
		// if(!is_exist)
			praline.push({ id: this.sel_praline.id, nom: this.sel_praline.nom, img: this.sel_praline.img_url_white, quantite: this.nbSelected });
		
		ballo = {
			id: new Date().valueOf(),
			nom: this.ballotin.nom,
			max: this.ballotin.max_pralines,
			img: this.ballotin.image,
			prix: this.ballotin.prix,
			id_ballotin: this.ballotin.id,
			total: this.totalSelected,
			pralines: praline
		};
		

		//ON met à jour le panier
		this.lgServ.updateNoSync('panier', ballo, this.ballotin.id);
		// this.lgServ.copiedAddSync('panier', ballo);
		this.vc.dismiss({ type: 'next', objet: ballo });
	}

	//Cette fonction permet de lancer le paiement
	checkPayment() {

		let id_custom_ballotin, ballo, is_exist = false;
		let praline = [] ;

		/* if(this.currentShop===undefined)
			praline = [];
		else
			praline = this.currentShop.pralines; */

		if (this.totalSelected >= this.ballotin.max_pralines) {
			this.totalSelected = this.ballotin.max_pralines;
		}

		for (let k = 0; k < praline.length; k++) {
			if (praline[k].id== this.sel_praline){
				praline[k].quantite = this.nbSelected;
				is_exist = true;
				break;
			}
		}

		//On insère dans la table
		// if(!is_exist)
			praline.push({ id: this.sel_praline.id, nom: this.sel_praline.nom, img: this.sel_praline.img_url_white, quantite: this.nbSelected });
		
		ballo = {
			id: new Date().valueOf(),
			nom: this.ballotin.nom,
			max: this.ballotin.max_pralines,
			prix: this.ballotin.prix,
			img: this.ballotin.image,
			id_ballotin: this.ballotin.id,
			total: this.totalSelected,
			pralines: praline
		};

		this.lgServ.updateNoSync('panier', ballo, this.ballotin.id);
		this.vc.dismiss({ type: 'payment', objet: ballo });
		// this.lgServ.remove('panier');
	}

	slideNext() {
		this.slider.slideNext();
		// this.totalSelected += this.slider.getActiveIndex() + 1;
	}
	slidePrev() {
		this.slider.slidePrev();
		// this.totalSelected += this.slider.getActiveIndex() + 1;
	}

}
