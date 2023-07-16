import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

// import { AboutPage } from '../about/about';
// import { ContactPage } from '../contact/contact';

@IonicPage()
@Component({
	selector: 'page-plus',
	templateUrl: 'plus.html'
})
export class PlusPage {
	public otherMenus: any;

	constructor(public navCtrl: NavController, public navParams: NavParams) {
		this.otherMenus = this.chargerMenus();
	}

	ionViewDidLoad() {}

	//Cette fonction permet de charger
	//les autres menus
	chargerMenus() {
		let pages = [
			{ title: "Les Pralines", pageName: 'TabsPage', tabComponent: "PralinesPage", index: 3, icon: 'assets/images/icons/chocolate.svg' },
			{ title: 'Quel Ballotin êtes vous ?', pageName: 'TabsPage', tabComponent: "CreationPage", index: 2, icon: 'assets/images/icons/bag.svg' },
			{ title: 'Où nous trouver ?', pageName: 'TabsPage', tabComponent: "StorePage", index: 1, icon: 'assets/images/icons/shop.svg' },
			{ title: 'Mon Panier', tabComponent: 'PanierPage', icon: 'assets/images/icons/shopping-bag.svg' },
			{ title: 'Mon Espace', pageName: 'TabsPage', tabComponent: 'MySpacePage', icon: 'assets/images/icons/user.svg' },
			{ title: 'A Propos', tabComponent: 'AboutPage', icon: 'assets/images/icons/information.svg' }
		];

		return pages;
	}

	//On récupère la référence pour
	// afficher la page correspondante
	showPageItem(newItem) {
		if (newItem.index != undefined) {
			this.navCtrl.parent.select(newItem.index);
		} else {
			this.navCtrl.push(newItem.tabComponent);
		}
	}

	//Fermer le formulaire
	close() {
		this.navCtrl.pop();
	}
}
