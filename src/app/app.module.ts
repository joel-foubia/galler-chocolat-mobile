import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicStorageModule } from '@ionic/storage';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { SocialSharing } from '@ionic-native/social-sharing';
import { CallNumber } from '@ionic-native/call-number';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { EmailComposer } from '@ionic-native/email-composer';

// import { AboutPage } from '../pages/about/about';
// import { ContactPage } from '../pages/contact/contact';
// import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireOfflineModule } from 'angularfire2-offline';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AfProvider } from '../providers/af/af';
import { LoginProvider } from '../providers/login/login';
import { ImageProvider } from '../providers/image/image';
import { Network } from '@ionic-native/network';
import { Keyboard } from '@ionic-native/keyboard';
import { Geolocation } from '@ionic-native/geolocation';
import { GooglemapProvider } from '../providers/googlemap/googlemap';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator';
import { GoogleMapsService } from '../pages/store/store.service';

export const firebaseConfig = {
	apiKey: 'AIzaSyAH4HdWE-iXXMdOX-KNAWCH_wXk8OGZ_1c',
	authDomain: 'besat-mobile.firebaseapp.com',
	databaseURL: 'https://besat-mobile.firebaseio.com',
	projectId: 'besat-mobile',
	storageBucket: 'besat-mobile.appspot.com',
	messagingSenderId: '662065602888'
};

@NgModule({
  declarations: [
    MyApp,
    // AboutPage,
    // ContactPage,
    // HomePage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
		AngularFireDatabaseModule,
		AngularFireOfflineModule,
		IonicStorageModule.forRoot({
			name: '_ona_galler'
		})
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    // AboutPage,
    // ContactPage,
    // HomePage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    EmailComposer,
    InAppBrowser,
    CallNumber,
    Geolocation,
    ImageProvider,
    LoginProvider,
    Network,
    SocialSharing,
    Keyboard,
    AfProvider,
    LaunchNavigator,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    GooglemapProvider,
    GoogleMapsService
  ]
})

export class AppModule {}
