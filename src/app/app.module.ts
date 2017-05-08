import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { OAuthButtonModule } from "../components/o-auth-button/o-auth-button.module";
import { TaskListModalModule } from "../components/task-list-modal/task-list-modal.module";
import { ConfirmDeleteModalModule } from "../components/confirm-delete-modal/confirm-delete-modal.module";
import { TaskModalModule } from "../components/task-modal/task-modal.module";
import { ProfileStoreProvider } from '../providers/profile-store-provider';
import { AuthenticationStoreProvider } from '../providers/authentication-store-provider';
import { GoogleTasksProvider } from '../providers/google-tasks-provider';

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    OAuthButtonModule,
    TaskListModalModule,
    ConfirmDeleteModalModule,
    TaskModalModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ProfileStoreProvider,
    AuthenticationStoreProvider,
    GoogleTasksProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
