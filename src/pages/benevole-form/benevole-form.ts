import { Component } from '@angular/core';
import { ViewController, NavController, ToastController } from 'ionic-angular';


@Component({
  selector: 'page-benevole-form',
  templateUrl: 'benevole-form.html',
})
export class BenevoleFormPage {

  public ambassador = {};

  constructor(public navCtrl: NavController, public toastCtrl: ToastController, public vc: ViewController) {
  }

  ionViewDidLoad() {}

  saveItem(){

  	let newItem = this.ambassador;
  	  	
  	if(this.isValid(newItem)){
  		//close current wien and pass data
  		this.vc.dismiss(newItem);
  	}else{
  		let toast = this.toastCtrl.create({
		    message: "Veuillez remplir le formulaire pour devenir ambassadeur",
		    duration: 3000,
		    position: 'middle'
		  });
  		toast.present();
  	}
  	

  }

  //Fermer le formulaire
  close(){
  	this.vc.dismiss();
  }

  //Permet de vérifier que tous les champs ne sont 
  //pas vide
  //@param objet (formulaire)
  //@return bool 
  private isValid(objet){

    let is_correct = true;

    if(objet.name=="" || objet.message=="" || objet.email=="" || objet.sujet=="")
      is_correct = false;

    return is_correct;
  }

}
