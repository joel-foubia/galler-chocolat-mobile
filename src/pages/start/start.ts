import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-start',
  templateUrl: 'start.html',
})
export class StartPage {

  menus: any;
  slides: any;
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.menus = this.loadMenu();
    this.slides = this.getSlides();
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad StartPage');
  }

  //on définit le slider
  getSlides(){

    let tab = [
      {img:"assets/images/bg_galler.jpg", title:"Les rencontres gourmandes", author: "par Jean Galler"},
      {img:"assets/images/boutiques.jpg", title:"La gourmandise près de chez vous"},
      {img:"assets/images/bg_pralines.jpg", title:"Nouvelles Sensations", sub: "Les Pralines"},
    ];

    return tab;
  }

  //Cette fonction permet de charger
  //le menu principal de la page
  loadMenu(){
  
  	let tab = [
  	
  	// { title: "Les Pralines", pageName: 'TabsPage', tabComponent: "PralinesPage", index: 3, icon: 'assets/images/icons/chocolate.svg' },
    { title: 'Quel Ballotin êtes vous ?', pageName: 'TabsPage', tabComponent: "CreationPage", index: 2, icon: 'assets/images/icons/bag.svg' },
    // { title: 'Où nous trouver ?', pageName: 'TabsPage', tabComponent: "StorePage", index: 1, icon: 'assets/images/icons/shop.svg' },
    // { title: 'Mon Espace', pageName: 'TabsPage', tabComponent: 'MySpacePage', icon: 'assets/images/icons/user.svg' }
  
  	];

  	return tab;
  }

  //Cette fonction permet d'ouvrir la page
  //sélectionné par l'utilisateur
  itemTapped(page) {

  	let params = {};
 
    // The index is equal to the order of our tabs inside tabs.ts
    if (page.index!=undefined) {
      params = { tabIndex: page.index };
      this.navCtrl.parent.select(page.index);
    }else{
      this.navCtrl.push(page.tabComponent, params);	
    }
    
  }
  
  goToBallotins(){
    let params = {};
    params = { tabIndex: 2 };
    this.navCtrl.parent.select(2);  }

  //Accéder à la vue boutique
  getToStore(){
    this.navCtrl.push('StorePage');	
  }

  //Accéder à la vue Espace Client
  goToMySpace(){
    this.navCtrl.push('MySpacePage');	
  }

}
