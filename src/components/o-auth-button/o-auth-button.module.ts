import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OAuthButton } from './o-auth-button';

@NgModule({
  declarations: [
    OAuthButton,
  ],
  imports: [
    IonicPageModule.forChild(OAuthButton),
  ],
  exports: [
    OAuthButton
  ]
})
export class OAuthButtonModule {}
