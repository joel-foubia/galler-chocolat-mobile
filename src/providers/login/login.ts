import { Injectable } from '@angular/core';
import { Network } from '@ionic-native/network';
import { Storage } from '@ionic/storage';
// import { LaunchNavigator } from '@ionic-native/launch-navigator';
import { SocialSharing } from '@ionic-native/social-sharing';
import * as moment from 'moment';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { ToastController } from 'ionic-angular';

@Injectable()
export class LoginProvider {
	private today;
	private flag = '_ona_flag';

	constructor(
		public storage: Storage,
		public network: Network,
		public browser: InAppBrowser,
		public toastCtrl: ToastController,
		public socialSharing: SocialSharing
	) {
		this.today = moment().format('DD.MM.YYYY');
	}

	/**
   * Cette fontion retourne la date courante
   * @returns string
   */
	getCurrentDate() {
		return moment().format('YYYY-MM-DD');
	}

	/**
	 * Cette fonction permet de récupérer
	 * les paramètres de connexion de l'avocat
	 * struct {uid:"", username: "", name: "", password: ""}
	 *
	 * @return Objet <login>
	 **/
	getLogin() {
		return this.storage.get('login');
	}

	/**
	 * Cette fonction permet de stocker
	 * les paramètres de connexion de l'avocat
	 * struct {uid:"", username: "", password: ""}
	 *
	 * @param data Struct, les paramètres de connexion de l'utilisateur
	 **/

	saveLogin(data) {
		let newData = JSON.stringify(data);
		this.storage.set('login', newData);
	}

	/**
	 * Cette fonction permet de sauvegarder les 
	 * paramètres de l'utilisateur une fois que ce
	 * dernier est fournir 
	 * @param JSON data
	 *
	 **/
	saveSettingUser(data) {
		let newData = JSON.stringify(data);
		this.storage.set('setting', newData);
	}

	/**
	 * Cette fonction permet de recupérer les 
	 * paramètres de l'utilisateur 
	 *
	 * @return String
	 **/
	getSettingUser() {
		return this.storage.get('setting');
	}

	/**
	 * Cette fonction permet de sauvegarder
	 * les informations de l'abonné (numéro abonnement et numéro client)
	 *
	 * @return String
	 **/
	saveDataAbonne(abonneNumber, clientNumber) {
		let data = {
			abonne: abonneNumber,
			client: clientNumber
		};

		let newData = JSON.stringify(data);

		this.storage.set('abonne', newData);
	}

	/**
	 * Cette méthode permet d'attribuer un favoris
	 * à une annonce
	 * @author Landry Fongang
	 * @param item any, l'objet
	 * @param model string, le nom de la table
	 */
	likeInternalStorage(item, model) {
		this.isTable('_ona_' + model).then((data) => {
			if (data) {
				var tempArray = [];
				tempArray = JSON.parse(data);
				for (let k = 0; k < tempArray.length; k++) {
					if (item.id == tempArray[k].id) {
						tempArray[k] = item;
						this.setTable('_ona_' + model, tempArray);
					}
				}
			}
		});
	}

	/**
	 * @author Landry Fongang (mr_madcoder_fil)
	 * Method to like an item. save the item in the local storage as like
	 * @param item to like in question
	 * @param Model data model the item belongs to EX. Listng, pointfinderltypes, etc
	 */
	likeItem(item, model) {
		// this.storage.get('_ona_' + model + 'fav');
		this.likeInternalStorage(item, model);
		this.isTable('_ona_' + model + '_fav').then((data) => {
			var array = [];
			if (data) {
				array = JSON.parse(data);
				array.push(item);
				this.setTable('_ona_' + model + '_fav', array);
			} else {
				array.push(item);
				this.setTable('_ona_' + model + '_fav', array);
			}
		});
	}

	/**
	 * @author Landry Fongang (mr_madcoder_fil)
	 * Method to unlike an item. remove the item in the local storage as like
	 * @param item to like in question
	 * @param Model data model the item belongs to EX. Listng, pointfinderltypes, etc
	 */
	disLikeItem(item, model) {
		// this.storage.get('_ona_' + model + 'fav');
		this.likeInternalStorage(item, model);
		this.isTable('_ona_' + model + '_fav').then((data) => {
			var tempFavArray = [];
			if (data) {
				tempFavArray = JSON.parse(data);
				for (let i = 0; i < tempFavArray.length; i++) {
					if (tempFavArray[i].id == item.id) {
						tempFavArray.splice(i, 1);
						if (tempFavArray.length == 0) {
							this.storage.remove('_ona_' + model + '_fav');
						} else {
							this.setTable('_ona_' + model + '_fav', tempFavArray);
						}
					}
				}
			}
		});
	}

	/**
	 * Cette fonction permet de partarger une note
	 * ou autres document
	 *
	 **/
	doShare(message, subject, fichier, url) {
		this.socialSharing
			.share(message, subject, fichier, url)
			.then(() => {
				// Sharing via email is possible
			})
			.catch(() => {
				/*  if(type=='notes')
			this.showMsgWithButton(this.txtObjet.native.share_note,'bottom','toast-info'); */
			});
	}

	/**
	 * Functionto retrive all images associated to an announcement
	 * @author Landry Fongang (mr_madcoder_fil)
	 * @param annonceid ID de L'annonce
	 */
	getImages(annonceid) {
		return new Promise((resolve, reject) => {
			this.isTable('_ona_media').then((media) => {
				var medias = [];
				var res_media = [];
				var annonceArray = [];
				annonceArray.push(annonceid);
				medias = JSON.parse(media);
				for (let k = 0; k < medias.length; k++) {
					if (annonceid == medias[k].post) {
						res_media.push(medias[k]);
					}
				}
				resolve(res_media);
			});
		});
	}

	/**
	 * Cette fonction permet de recupérer les 
	 * les informations de l'abonné (numéro abonnement et numéro client)
	 *
	 * @return String
	 **/
	getDataAbonne() {
		return this.storage.get('abonne');
	}

	/**
	 * Cette fonction recupere la valeur de l'objet type
	 * si la table (client, tribunal, ou contact existe)
	 *
	 * @return Objet <type>
	 **/
	isTable(type) {
		return this.storage.get(type);
	}

	/**
	 * Cette fonction définie la valeur true 
	 * lorsque les données sont présents dans la table (client, contact ou tribunal)
	 *
	 * @param type, nom de la table
	 * @param data Struct, 
	 **/

	setTable(type, data) {
		let newData = JSON.stringify(data);
		this.storage.set(type, newData);
	}

	setDataNoStringy(type, data) {
		this.storage.set(type, data);
	}

	remove(cle) {
		this.storage.remove(cle);
	}

	getToday() {
		return this.today;
	}

	/**
	 * Cette fonction permet d'enregistrer la date
	 * de la dernière synchronisation
	 * 
	 */
	setLastUpdate() {
		this.storage.set('_last_synchro', moment().format());
	}

	setSync(type) {
		this.storage.set(type, moment().format('YYYY-MM-DDTHH:mm:ss'));
	}

	/**
	 * cette fonction permet de dire si oui ou non
	 * la synchronisation est terminer
	 * @param value boolean, 
	 */
	fixSynchro(value: boolean) {
		this.storage.set('is_synchro', value);
	}

	/**
	 * Cette fonction permet d'ouvrir un site web
	 * @param adrWeb string
	 * @param txtMessage string
	 * (A Executer sur un Smartphone)
	 **/
	doWebsite(adrWeb, txtMessage) {
		if (adrWeb) {
			this.browser.create(adrWeb);
		} else {
			let toast = this.toastCtrl.create({
				message: txtMessage,
				duration: 3000,
				position: 'top'
			});
			toast.present();
		}
	}

	/**
   * Function called in the constructor of any view to check internet status and last sync date
   * 
   */
	checkStatus(alias) {
		return new Promise((resolve, reject) => {
			this.storage.get(this.flag).then((flag) => {
				this.storage.get(alias + '_date').then((date) => {
					if (flag === false && !date) {
						resolve('i'); //No data save
						console.log('Connect To internet to view content');
					} else if (flag === false && date) {
						resolve('s'); //read data from storage
						console.log('Reading from storage');
					} else if (flag === true && date) {
						resolve('s');
						console.log('Reading from Storage');
						/* if (date === moment().format('YYYY-MM-DDTHH:mm:ss')) {
							resolve('s');
							console.log('Reading from Storage');
						} else {
							resolve('w');
							console.log('Reading from Server and Synchronize with storage');
						} */
					} else if (flag === true && !date) {
						resolve('rw');
						console.log('Reading from Server and save data to storage');
					}
				});
			});
		});
	}

	/**
   * Function called in app.component.ts to check availability of internet connection and last 
   * sync date
   */
	checkstatus() {
		if (this.network.type === 'unknown' || this.network.type === 'none' || this.network.type === 'undefined') {
			this.storage.set(this.flag, false);
			localStorage.setItem('is_update', 'false');
		} else {
			localStorage.setItem('is_update', 'true');
			this.storage.get('is_sync').then((reponse) => {
				this.storage.set(this.flag, true);
				if (reponse != null && reponse == false) {
					this.storage.set(this.flag, false);
				}
			});
		}

		//On écoute les évènements disconnect et on connecte
		let connected = this.network.onConnect().subscribe(() => {
			setTimeout(() => {
				localStorage.setItem('is_update', 'true');
				this.storage.get('is_sync').then((reponse) => {
					this.storage.set(this.flag, true);
					if (reponse != null && reponse == false) {
						this.storage.set(this.flag, false);
					}
				});
			}, 5000);
		});

		let disconnected = this.network.onDisconnect().subscribe(() => {
			setTimeout(() => {
				this.storage.set(this.flag, false);
				localStorage.setItem('is_update', 'false');
			}, 5000);
		});
	}

	/**
   * Cette fonction permet d'activer la synchro
   * ou de désactiver la synchro
   * @param active boolean, active ou desactive la synchro auto
   */
	desactiveSync(active: boolean) {
		this.storage.set('is_sync', active);
		this.storage.set(this.flag, active);
	}

	//Cette fonction renvoie la valeur courrante
	//de la synchro
	getCurrentValSync() {
		return this.storage.get('is_sync');
	}

	/**
	 * Function to sync executed after each minute (or 2 minutes)
	 */
	connChange(alias) {
		return new Promise((resolve, reject) => {
			console.log('Time to Sync ' + alias);
			this.storage.get(this.flag).then((flag) => {
				this.storage.get(alias + '_date').then((date) => {
					//this.presentAlert('','Flag' + flag)
					if (flag === true) {
						//Make Synchronisation
						resolve(true);
					} else if (flag === false || date === moment().format('DD.MM.YYYY')) {
						console.log('No Sync');
						resolve(false);
					}
				});
			});
		});
	}

	/**
	 * Cette fonction permet de sauvegarder une image depuis firebase
	 * @param cle string, il s'agit de l'url de la photo que l'on souhaite sauvegarder
	 * @param valeur string, image en base 64
	 */
	savePhoto(cle, valeur) {
		this.storage.set(cle, valeur);
	}

	/**
	 * Cette fonction récupère la base64 de l'image
	 * @param cle string, la clé permettant de récupérer la valeur
	 */
	findPhotoByURL(cle) {
		return new Promise((resolve, reject) => {
			this.storage.get(cle).then((res) => {
				if (res) {
					resolve(res);
				} else {
					reject({ err: 1, message: 'Image not found' });
				}
			});
		});
	}

	/**
	 * Cette fonction permet de vérifier que la date
	 * en paramètre est la meme
	 * @param current_date String date
	 * @returns boolean
	 */
	sameDate(current_date, strTime?: string) {
		let texte = '';
		if (strTime === undefined) texte = '';
		else texte = strTime;

		if (moment(moment().format('YYYY-MM-DD'), 'YYYY-MM-DD' + texte).isSame(moment(current_date, 'YYYY-MM-DD'))) {
			// console.log('trouve');
			return true;
		}

		return false;
	}

	/**
	 * Cette fonction permet de vérifier que la date
	 * est correcte
	 * @param current_date String date
	 * @returns boolean
	 */
	valideDate(current_date) {
		var date = moment(current_date);
		date.add(1, 'M');

		if (
			moment(date.year().toString() + '-' + date.month().toString() + '-01', 'YYYY-MM-DD').isValid() &&
			moment(
				date.year().toString() + '-' + date.month().toString() + '-' + date.daysInMonth().toString(),
				'YYYY-MM-DD'
			).isValid()
		)
			return true;

		return false;
	}

	/**
	 * Cette fonction permet de vérifier que la date
	 * actuelle se trouve dans le mois courrant
	 * @param current_date String date
	 * @returns boolean
	 */
	dateBetween(current_date) {
		var date = moment(current_date);
		date.add(1, 'M');

		if (
			moment(moment().format('YYYY-MM-DD').toString()).isBetween(
				moment(date.year().toString() + '-' + date.month().toString() + '-01', 'YYYY-MM-DD')
					.format('YYYY-MM-DD')
					.toString(),
				moment(
					date.year().toString() + '-' + date.month().toString() + '-' + date.daysInMonth().toString(),
					'YYYY-MM-DD'
				)
					.format('YYYY-MM-DD')
					.toString(),
				null,
				'[]'
			)
		)
			return true;

		return false;
	}

	/**
	 * Cette fonction permet de récupérer la localisation
	 * de l'utilisateur connecté et de récupérer l'adresse correspondant
	 */
	getLocation() {
		// this.geolocation
		// 	.getCurrentPosition()
		// 	.then((resp) => {
		// 		// resp.coords.latitude
		// 		// resp.coords.longitude
		// 		this.persistence.reverseGeocoding(resp.coords.latitude, resp.coords.longitude).then((address) => {
		// 			var coordinates;
		// 			coordinates = address;
		// 			let coordArray = [
		// 				coordinates.results[0].address_components[0].long_name,
		// 				coordinates.results[0].address_components[1].long_name,
		// 				coordinates.results[0].address_components[2].long_name,
		// 				coordinates.results[0].address_components[3].long_name,
		// 				coordinates.results[0].address_components[4].long_name
		// 			];
		// 			this.storage.set('currentLocation', coordArray);
		// 			let coordObj = {
		// 				latitude: resp.coords.latitude,
		// 				longitude: resp.coords.longitude
		// 			};
		// 			this.storage.set('currentCoordinates', coordObj);
		// 		});
		// 	})
		// 	.catch((error) => {
		// 		console.log('Error getting location', error);
		// 	});
	}

	/**
	 * Cette fonction permet d'ajouter un élément
	 * dans la bd interne
	 * @param type string, le nom du modèle
	 * @param objet JSon, l'objet à insérer
	 *
	 **/
	copiedAddSync(type, objet) {
		this.isTable(type).then((res) => {
			let reqs = [];
			if (res) {
				reqs = JSON.parse(res);
			}

			reqs.push(objet);
			this.setTable(type, reqs);
		});
	}

	/**
	 * Cette fonction permet de mettre à jour
	 * un enregistrement d'une table dans la bd interne
	 * @param type string, le nom du modèle (objet)
	 * @param data JSON, les données devant remplacer l'objet ayant l'id
	 * @param id int, l'identifiant de l'objet
	 * @param ev string, l'événement indiquant quel type de mise à jour que l'on effectue
	 *
	 **/
	updateNoSync(type, data, id_ballotin) {
		console.log('Type=>', type, 'Data=>', data);
		/* this.isTable(type).then((res) => {
			let trouve = false;

			if (res) {
				let list_objets = JSON.parse(res);

				for (let i = 0; i < list_objets.length; i++) {
					if (list_objets[i].id_ballotin == id_ballotin) {
						// var paraline_array = [];
						// paraline_array = list_objets[i].pralines;
						list_objets[i] = data;
						trouve = true;
						break;
					}
				}

				//Cette instruction met à jour la database
				if (trouve) this.setTable(type, list_objets);
				
			} else {
				this.copiedAddSync(type, data);
			}
		}); */
		this.isTable(type).then((res) => {
			let trouve = false;

			if (res) {
				let list_objets = JSON.parse(res);

				for (let i = 0; i < list_objets.length; i++) {
					if (list_objets[i].id_ballotin == id_ballotin) {
						var paraline_array = [];
						paraline_array = list_objets[i].pralines;
						list_objets[i] = data;

						list_objets[i].nom = data.nom;
						list_objets[i].id_ballotin = data.id_ballotin;
						// paraline_array.concat(data.pralines);
						list_objets[i].pralines = paraline_array.concat(data.pralines);

						trouve = true;
						break;
					}
				}

				//Cette instruction met à jour la database
				if (trouve) this.setTable(type, list_objets);
				else {
					list_objets.push(data);
					this.setTable(type, list_objets);
				}
			} else {
				this.copiedAddSync(type, data);
			}
		});
	}
}
