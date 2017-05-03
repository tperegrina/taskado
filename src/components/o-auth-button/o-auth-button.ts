import { Component, ElementRef } from '@angular/core';

/**
 * Generated class for the OAuthButton component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'o-auth-button',
  templateUrl: 'o-auth-button.html'
})
export class OAuthButton {

  private clientId:string = '427259731791-l4behia2q4icckm6msffuj5p7u92hrv3.apps.googleusercontent.com';

  private scope = [
    'profile',
    'https://www.googleapis.com/auth/tasks'
  ].join(' ');

  public auth2: any;

  constructor(private element: ElementRef) {
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

}
