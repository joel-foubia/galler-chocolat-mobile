import { Component, ViewChild, OnInit } from '@angular/core';
import { NavController, LoadingController, ToastController, NavParams, IonicPage } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { Keyboard } from '@ionic-native/keyboard';

import { Observable } from 'rxjs/Observable';

import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator';
import { GoogleMap } from '../../components/google-map/google-map';
import { GoogleMapsService } from './store.service';
import { StoreModel, StorePlace } from './store.model';
import { google } from '@google/maps';

/**
 * Generated class for the StorePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var google: any;
@IonicPage()
@Component({
	selector: 'page-store',
	templateUrl: 'store.html'
})
export class StorePage {
	@ViewChild(GoogleMap) _GoogleMap: GoogleMap;
	map_model: StoreModel = new StoreModel();
	toast: any;

	constructor(
		public nav: NavController,
		public loadingCtrl: LoadingController,
		public toastCtrl: ToastController,
		public googleMapsService: GoogleMapsService,
		public geolocation: Geolocation,
		public keyboard: Keyboard,
		public launchNavigator: LaunchNavigator
	) {}

	ionViewDidLoad() {}

	ngOnInit() {
		let _loading = this.loadingCtrl.create();
		_loading.present();

		this._GoogleMap.$mapReady.subscribe((map) => {
			console.log('map=>', map);
			this.map_model.init(map);
			_loading.dismiss();
		});
	}

	searchPlacesPredictions(query: string) {
		let env = this;

		if (query !== '') {
			this.googleMapsService.getPlacePredictions(query).subscribe(
				(places_predictions) => {
					console.log('Place =>', places_predictions);
					this.map_model.search_places_predictions = places_predictions;
				},
				(e) => {
					console.log('onError: %s', e);
				},
				() => {
					console.log('onCompleted');
				}
			);
		} else {
			this.map_model.search_places_predictions = [];
		}
	}

	setOrigin(location: google.maps.LatLng) {
		let env = this;

		// Clean map
		this.map_model.cleanMap();

		// Set the origin for later directions
		this.map_model.directions_origin.location = location;

		this.map_model.addPlaceToMap(location, '#00e9d5');

		// With this result we should find restaurants (*places) arround this location and then show them in the map

		// Now we are able to search *restaurants near this location
		this.googleMapsService.getPlacesNearby(location).subscribe(
			(nearby_places) => {
				console.log('Nearby Places => ', nearby_places);
				// Create a location bound to center the map based on the results
				let bound = new google.maps.LatLngBounds();
				var name: string;

				for (var i = 0; i < nearby_places.length; i++) {
					name = nearby_places[i].name;
					if (name.indexOf('Galler') > -1) {
						bound.extend(nearby_places[i].geometry.location);
						this.map_model.addNearbyPlace(nearby_places[i]);
					}
				}

				// Select first place to give a hint to the user about how this works
				this.choosePlace(this.map_model.nearby_places[0]);

				// To fit map with places
				this.map_model.map.fitBounds(bound);
			},
			(e) => {
				console.log('onError: %s', e);
			},
			() => {
				console.log('onCompleted');
			}
		);
	}

	selectSearchResult(place: google.maps.places.AutocompletePrediction) {
		let env = this;

		this.map_model.search_query = place.description;
		this.map_model.search_places_predictions = [];

		// We need to get the location from this place. Let's geocode this place!
		this.googleMapsService.geocodePlace(place.place_id).subscribe(
			(place_location) => {
				console.log('Place Location=>', place_location);
				this.setOrigin(place_location);
			},
			(e) => {
				console.log('onError: %s', e);
			},
			() => {
				console.log('onCompleted');
			}
		);
	}

	clearSearch() {
		let env = this;
		this.keyboard.close();
		// Clean map
		this.map_model.cleanMap();
	}

	geolocateMe() {
		let env = this,
			_loading = this.loadingCtrl.create();

		_loading.present();

		this.geolocation
			.getCurrentPosition()
			.then((position) => {
				let current_location = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
				this.map_model.search_query =
					position.coords.latitude.toFixed(2) + ', ' + position.coords.longitude.toFixed(2);
				this.setOrigin(current_location);
				this.map_model.using_geolocation = true;

				_loading.dismiss();
			})
			.catch((error) => {
				console.log('Error getting location', error);
				_loading.dismiss();
			});
	}

	choosePlace(place: StorePlace) {
		console.log('Choose place=> ', place);
		let env = this;

		// Check if the place is not already selected
		if (place != undefined) {
			if (!place.selected) {
				// De-select previous places
				this.map_model.deselectPlaces();
				// Select current place
				place.select();

				// Get both route directions and distance between the two locations
				let directions_observable = this.googleMapsService.getDirections(
						this.map_model.directions_origin.location,
						place.location
					),
					distance_observable = this.googleMapsService.getDistanceMatrix(
						this.map_model.directions_origin.location,
						place.location
					);

				Observable.forkJoin(directions_observable, distance_observable).subscribe(
					(data) => {
						console.log('Data output => ', data);
						let directions = data[0],
							distance = data[1].rows[0].elements[0].distance.text,
							duration = data[1].rows[0].elements[0].duration.text;

						this.map_model.directions_display.setDirections(directions);

						if (this.toast) {
							this.toast.dismiss();
						}

						this.toast = this.toastCtrl.create({
							message: "That's " + distance + ' away and will take ' + duration,
							duration: 2000
						});
						this.toast.present();
					},
					(e) => {
						console.log('onError: %s', e);
					},
					() => {
						// console.log('onCompleted');
					}
				);
			}
		} else {
			this.toast = this.toastCtrl.create({
				message: 'No galler Store found at that addresse',
				duration: 2000
			});
			this.toast.present();
		}
	}

	viewOnGoogleMap(place) {
		this.launchNavigator.navigate(place.details.vicinity).then(
			(success) => {},
			(err) => {
				console.log('Error', err);
			}
		);
	}
}
