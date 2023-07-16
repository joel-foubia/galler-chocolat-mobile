/** Configuration Firebase **/
export const firebaseConfig = {
    apiKey: "AIzaSyB8RxaICq1GNPxnDJeAqIkXiPa7f0-dkx8",
    authDomain: "noma-program.firebaseapp.com",
    databaseURL: "https://noma-program.firebaseio.com",
    projectId: "noma-program",
    storageBucket: "noma-program.appspot.com",
    messagingSenderId: "648006012938"
};

/** Configuration des patterns API **/
/** Configuration de la sauvegarde locale **/
export class ApiConfig {

	static pattern = "/wp-json/wp/v2/";
	static nom_setting =  'noma_setting';
	static nom_donation = 'noma_don';
	static nom_maladie =  'noma_maladie';
	static url_about = "/a-propos/?json=1"; //url api A Propos
	static url_missions = "/nos-missions/?json=1"; //url api A Propos
	static url_objectifs = "/nos-projets/?json=1"; //url api Nos Projets
	static url_noma = "/le-noma/?json=1"; //url api La maladie
	static url_signatures = "/liste-des-signatures/?json=1"; //url api nombre signature (pétition)
	static url_articles = "/wp-json/wp/v2/posts"; //url api liste actualités
	static url_petition = "/wp-content/API/Insert_Petitition.php"; //url api insertion pétition
	static url_max_petition = "/liste-des-signatures/?json=1";
	static Max_Petition = 100;
	static url_parrains = "/liste-des-pareins/?json=1"; 
	static url_save_parrain = "/wp-content/API/insert_parrain.php";
	static url_list_parrain = "/wp-content/API/liste_parrein.php";
	static nom_app = "NOMA PROGRAM";
	static url_pays = "../assets/countries.json";
	static txt_parrain = "Grâce à votre soutien régulier,<br>Nous planifions sur le long terme et agissons rapidement en cas de situation d’urgence; l’association NOMA PROGRAM est financée grâce à des actions spontanées menées par des personnes engagées comme vous. votre don est le bienvenu pour venir en aide aux victimes et mener des campagnes de prévention";
};

export class ApiPaypal {
	static currency = 'EUR';
	static msgSuccess = "Merci pour votre Don !";

	//Définition des messages erreurs ou de success lorsque 
	//le paiement a été effectué ou pas
	static errorInit(){

		let objErr = {
			titre: 'DONATION',
			texte: 'Impossible de procéder au paiement. Veuillez vérifier votre connexion Internet ou bien votre appareil ne supporte pas PayPal'
		};

		return objErr;
	}

	static errorSetting(){

		let objErr = {
			titre: 'DONATION',
			texte: 'Impossible de procéder au paiement car une erreur est survenu durant la procédure. Contactez L\'Association'
		};

		return objErr;
	}

	static cancelPayment(){

		let objErr = {
			titre: 'DONATION',
			texte: 'Vous avez annulé la procédure de paiement'
		};

		return objErr;
	}
};


export class Mission{

	static MaxPetition = 100;
	static msgEmptyForm = "Veuillez remplir le formulaire ci-après";
	static msgNoCompleteForm = "Veuillez remplir les champs ayant des astérix (*), il s'agit des champs obligatoires";
	static msgNoEmailForm = "L'Email que vous avez saisi ne correspond pas à l'Email de confirmation";

	static getArticle(){

		let objMission = {
			titre: "Devenir ambassadeur",
			texte: "1- Vous devriez prendre un selfie avec le message suivant: #DISONS STOP À LA TRAGÉDIE DES ENFANTS RAVAGÉS PAR LE NOMA puis diffuser la photo à la presse ainsi que sur les réseaux sociaux (Facebook, Twitter, Instagram…).<br><br>2- Vous devriez également inviter vos homologues ou amis à rejoindre la cause — pour que soit mis définitivement fin à cette effroyable tragédie des enfants ravagés par le noma.<br><br>3- Participer par votre présence aux événements majeurs organisés par Noma Program pour la sensibilisation de la population et la promotion de ses actions de terrain.<br><br>4- Relayer sur les réseaux sociaux, les appels aux dons pour le financement du programme de prévention, de détection précoce et de guérison du noma, ainsi que la construction à Yaoundé d’un Hôpital de Référence/Centre d’accueil pour la prise en charge du Noma et des maladies infantiles difficilement opérables en Afrique."
		}

		return objMission;
	}

	static getTextParrain(){
		
		let objet = {
			titre: "Etre Parrain ou Marraine",
			texte: "Grâce à votre soutien régulier,<br>Nous planifions sur le long terme et agissons rapidement en cas de situation d’urgence; l’association NOMA PROGRAM est financée grâce à des actions spontanées menées par des personnes engagées comme vous. votre don est le bienvenu pour venir en aide aux victimes et mener des campagnes de prévention."	
		}

		return objet;
	}

	static getTextPetition(){

		let objet = {
			tite: "Pétition",
			texte : "Dites STOP à la tragédie des enfants défigurés par le noma.<br>Nous demandons que la lutte contre le noma soit inscrite à l'ordre du jour de l'assemblée générale de l'ONU, et qu'une résolution contraignante soit adoptée sur l'éradication définitive de cette terrible maladie causée principalement par la malnutrition.<br>La chose la plus effrayante à propos du noma ?? Il est totalement imprévisible, et il peut s'attaquer à tout enfant âgé de 0 à 6 ans mal-nourris ou vivant dans les conditions de pauvreté extrême. Selon un rapport de l'OMS, 140 000 nouveaux cas sont détectés chaque année. En l'absence de traitement rapide, le noma est mortel dans 90% des cas et laisse les survivants dans un état de mutilation insoutenable.<br>Le Noma fait partie des maladies négligées. Éradiqué totalement en Europe au début du 20ème siècle, il est aujourd’hui essentiellement présent dans les pays défavorisés et tout particulièrement en Afrique. Il est aussi nommé « maladie de la pauvreté ».<br>Heureusement qu'on peut prévenir, guérir ou éradiquer le noma avec des moyens simples et peu coûteux (campagnes de sensibilisation aux facteurs de risque, détection précoce de la maladie, prise en charge adaptée des victimes, lutte contre la malnutrition chez les enfants de moins de 6 ans, lutte contre la pauvreté).<br>Il est indispensable que chaque pays, chaque ministère de la santé ait un plan national opérationnel qui puisse mener des campagnes nationales, à grande échelle, de formation d'agents de santé et de sensibilisation sociale tout en encadrant et coordonnant toutes les actions de lutte. À terme, le renforcement des capacités nationales permettra d'obtenir des résultats durables dans l'élimination du noma."
		}; 

		return objet;

	}
};

