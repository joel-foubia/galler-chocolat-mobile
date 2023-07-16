import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { AfProvider } from '../../providers/af/af';
import { Geolocation } from '@ionic-native/geolocation';

/**
 * Generated class for the PaniermodalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
	selector: 'page-paniermodal',
	templateUrl: 'paniermodal.html'
})
export class PaniermodalPage {
	spinnerObj: boolean;
	ballotin;
	name;
	boutiques = [];
	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public vc: ViewController,
		public geolocation: Geolocation,
		public af: AfProvider
	) {
		if (navParams.get('ballotin').objet) {
			this.ballotin = navParams.get('ballotin').objet;
		} else {
			this.ballotin = navParams.get('ballotin');
		}
		this.spinnerObj = true;
		this.af.getBoutiques().subscribe((res) => {
			this.filterNearBy(res);
		});
	}

	ionViewDidLoad() {}

	closeModal() {
		this.vc.dismiss();
	}

	//Element choisi
	itemSelected(boutique) {
		if (this.name === undefined || this.name == '')
			this.af.showMessage("Veuillez attribuer un nom à votre ballotin sur le champ marquer d'un astérix (*)");
		else {
			let objet = {
				name: this.name,
				boutique: boutique
			};

			this.vc.dismiss(objet);
		}
	}

	/**
	 * Cette fonction permet de filtrer la 
	 * liste des bpoutiques à proximité
	 * @param arrayRange Array<any>, liste des boutiques
	 */
	filterNearBy(arrayRange) {
		console.log('Filtering nearby');
		this.geolocation
			.getCurrentPosition()
			.then((resp) => {
				console.log('response =>', resp);
				// resp.coords.latitude
				// resp.coords.longitude
				let tabs = [];
				this.spinnerObj = false;
				for (let i = 0; i < arrayRange.length; i++) {
					var calDist = this.calcDistance(
						resp.coords.latitude,
						resp.coords.longitude,
						arrayRange[i].latitude,
						arrayRange[i].longitude,
						'K'
					);
					calDist = calDist * 1000;

					arrayRange[i]['distFrom'] = Math.round(calDist / 1000 * 100) / 100;
					// console.log('Dist From', Math.round(calDist / 1000 * 100) / 100);
					this.boutiques.push(arrayRange[i]);
				}
				console.log('Sorted Tableau=>', this.sortNearest(this.boutiques));
				// console.log(tabs);
				// this.boutiques = this.sortTableau(tabs);
			})
			.catch((error) => {
				// console.log('Error getting location', error);
			});

		// this.boutiques = this.sortTableau(this.boutiques);
	}

	/**
	 * Calcul de la distance entre 2 points
	 */
	private calcDistance(lat1, lon1, lat2, lon2, unit) {
		var radlat1 = Math.PI * lat1 / 180;
		var radlat2 = Math.PI * lat2 / 180;
		var theta = lon1 - lon2;
		var radtheta = Math.PI * theta / 180;
		var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
		dist = Math.acos(dist);
		dist = dist * 180 / Math.PI;
		dist = dist * 60 * 1.1515;
		if (unit == 'K') {
			dist = dist * 1.609344;
		}
		if (unit == 'N') {
			dist = dist * 0.8684;
		}
		// console.log('Calculated Distance', dist);
		return dist;
	}

	/**
	 * @author Landry Fongang (mr_madcoder_fil)
	 * Cette fontion permet de trier les boutiques du plus proches au plus eloigner
	 * @param array Array<any>, liste des boutiques
	 */
	sortNearest(array) {
		let places = [];
		places = array;
		return places.sort(function(a, b) {
			return a.distFrom - b.distFrom;
		});
	}
}
