import { Component,  ViewChild } from '@angular/core';
import { NavParams, Events, Tabs } from 'ionic-angular';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  @ViewChild(Tabs) tabs: Tabs;

  tab1Root = 'StartPage';
  tab2Root = 'StorePage';
  tab3Root = 'CreationPage';
  tab4Root = 'PralinesPage';
  tab5Root = 'PlusPage';

  public myIndex: any;

  constructor(navParams: NavParams, events: Events) {
  	
  	this.myIndex = navParams.data.tabIndex || 0;
  }
}
