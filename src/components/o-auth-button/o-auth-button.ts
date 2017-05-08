import { Component, ElementRef, NgZone } from '@angular/core';
import { ProfileStoreProvider } from '../../providers/profile-store-provider';
import { AuthenticationStoreProvider } from '../../providers/authentication-store-provider';

/**
 * Hanldes Authentication with Google
 */
@Component({
  selector: 'o-auth-button',
  templateUrl: 'o-auth-button.html'
})
export class OAuthButton {

  private clientId:string = '427259731791-l4behia2q4icckm6msffuj5p7u92hrv3.apps.googleusercontent.com';

  private scope = [
    'https://www.googleapis.com/auth/tasks'
  ].join(' ');

  private auth2: any;

  constructor(private element: ElementRef, private profileStore: ProfileStoreProvider,
              private authenticationStore:AuthenticationStoreProvider, private _zone: NgZone) {

  }

  //Loads auth2 Module enabling user sign in
  public googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: this.clientId,
        cookie_policy: 'single_host_origin',
        scope: this.scope
      });
      this.attachSignIn(this.element.nativeElement.firstChild);
    });
  }

  // attaches signIn handler to oauthbutton element, requires ngZone to update angular
  // TODO: Implement silent signIn for users that are already authenticated
  public attachSignIn(element) {
    let profileData = {};
    this.auth2.attachClickHandler(element, {},
      (googleUser) => {
        this._zone.run(() => {
          let profile = googleUser.getBasicProfile();
          profileData = {
            name: profile.getName(),
            email: profile.getEmail()
          };
          this.authenticationStore.setAuthToken(googleUser.getAuthResponse().access_token);
          this.profileStore.setProfile(profileData);
        });

      }, function (error) {
        console.log(JSON.stringify(error, undefined, 2));
      });
  }

  ngAfterViewInit() {
    this.googleInit();
  }

}
