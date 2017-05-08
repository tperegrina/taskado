import {Injectable} from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Profile } from '@models/Profile';

/*
Stores and propagates user profile data
 */

@Injectable()
export class ProfileStoreProvider {

  constructor() {

  }
  private profile = {} as Profile;
  private profileSubject = new Subject<Profile>();

  public setProfile(user:any) {
    this.profile = {
      name: user.name,
      email: user.email
    };
    this.profileSubject.next(this.profile);
  }

  public getProfile(): Observable<Profile> {
    return this.profileSubject.asObservable();
  }

}
