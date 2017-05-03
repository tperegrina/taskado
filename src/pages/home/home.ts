import {Component, NgZone, AfterViewInit, ElementRef} from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements AfterViewInit{

  private clientId:string = '427259731791-l4behia2q4icckm6msffuj5p7u92hrv3.apps.googleusercontent.com';

  private scope = [
    'profile',
    'https://www.googleapis.com/auth/tasks'
  ].join(' ');

  public auth2: any;

  constructor(public navCtrl: NavController, private _zone: NgZone, private element: ElementRef) {
    console.log(this);
    console.log('ElementRef: ', this.element);
  }

  public googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: this.clientId,
        cookie_policy: 'single_host_origin',
        scope: this.scope
      });
      this.attachSignin(this.element.nativeElement.firstChild);
    });
  }

  public attachSignin(element) {
    this.auth2.attachClickHandler(element, {},
      (googleUser) => {
        let profile = googleUser.getBasicProfile();
        console.log('Token || ' + googleUser.getAuthResponse().id_token);
        console.log('ID: ' + profile.getId());
        // ...
      }, function (error) {
        console.log(JSON.stringify(error, undefined, 2));
      });
  }

  ngAfterViewInit() {
    this.googleInit();
  }

  // Triggered after a user successfully logs in using the Google external
  // login provider.
/*  onGoogleLoginSuccess = (loggedInUser) => {
    this._zone.run(() => {
      this.userAuthToken = loggedInUser.getAuthResponse().id_token;
      this.userDisplayName = loggedInUser.getBasicProfile().getName();
    });
  }*/




}
