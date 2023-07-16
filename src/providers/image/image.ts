import { Injectable } from '@angular/core';
import * as firebase from 'firebase';


@Injectable()
export class ImageProvider {

  constructor() {}

  /**
   * Cette fonction permet de récupérer
   * les images qui sont stockées via Firebase
   *
   * @param url string, url de l'image
   * @param imgSrc string, 
   **/
  getImageReadable(url, imgSrc) {

    firebase.storage().refFromURL(url).getDownloadURL()
      .then(response => imgSrc = response)
      .catch((error) => {});
  }

  getCallbackURL(url, callback){

    return firebase.storage().refFromURL(url).getDownloadURL()
                  .then(response => {
                      callback(response);
                  })
                  .catch((error) => {});
  }

}
