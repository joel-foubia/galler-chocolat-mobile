import { Component, ViewChild } from '@angular/core';
import { NavController, Nav, IonicPage } from 'ionic-angular';

// import { AssociationPage } from '../association/association';
// import { ContactPage } from '../contact/contact'; 
import { TabsPage } from '../tabs/tabs';

 
export interface PageInterface {
  title: string;
  pageName?: any;
  tabComponent?: any;
  index?: number;
  icon: string;
}

@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {
  // Basic root for our content view
  rootPage = TabsPage;
 
  // Reference to the app's root nav
  @ViewChild(Nav) nav: Nav;
 
  pages: PageInterface[] = [
    //{ title: "Accueil", pageName: HomePage, tabComponent: HomePage, icon: 'home' }, 
    { title: "Accueil", pageName: TabsPage, tabComponent: 'StartPage', index: 0, icon: 'assets/img/home.png' },
    { title: "Les Pralines", pageName: 'TabsPage', tabComponent: "PralinesPage", index: 3, icon: 'assets/img/association.png' },
    { title: 'Mon Espace', pageName: 'TabsPage', tabComponent: 'MySpacePage', icon: 'assets/img/noma.png' },
    { title: 'Où nous trouver ?', pageName: 'TabsPage', tabComponent: "StorePage", icon: 'assets/img/actu.png' },
    { title: 'Quel Ballotin êtes vous ?', pageName: 'TabsPage', tabComponent: "CreationPage", index: 2, icon: 'assets/img/donation.png' },
    { title: 'A Propos', pageName: 'AboutPage', tabComponent: 'AboutPage', icon: 'assets/img/about.png' }
    
  ];
 
  constructor(public navCtrl: NavController) { }
 
  openPage(page: PageInterface) {
    let params = {};
 
    // The index is equal to the order of our tabs inside tabs.ts
    if (page.index) {
      params = { tabIndex: page.index };
    }
 
    // The active child nav is our Tabs Navigation
    if (this.nav.getActiveChildNav() && page.index != undefined) {
      this.nav.getActiveChildNav().select(page.index);
    } else {
      // Tabs are not active, so reset the root page 
      // In this case: moving to or from SpecialPage
      this.nav.setRoot(page.pageName, params);
    }
  }
 
  isActive(page: PageInterface) {
    // Again the Tabs Navigation
    let childNav = this.nav.getActiveChildNav();
 
    if (childNav) {
      if (childNav.getSelected() && childNav.getSelected().root === page.tabComponent) {
        return 'primary';
      }
      return;
    }
 
    // Fallback needed when there is no active childnav (tabs not active)
    if (this.nav.getActive() && this.nav.getActive().name === page.pageName) {
      return 'primary';
    }
    return;
  }
 
}