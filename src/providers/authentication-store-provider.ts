import {Injectable} from '@angular/core';
import { Observable, Subject } from 'rxjs';

const tokenName = 'taskado.authToken';

/*
Stores and propagates user Authentication status and token.
 Posible Improvements:
 - Handling of token renewal
 */

@Injectable()
export class AuthenticationStoreProvider {

  private authToken: string;
  private authTokenSubject = new Subject<string>();
  private loggedInSubject = new Subject<boolean>();

  constructor() {
    this.authToken = localStorage.getItem(tokenName);
    this.loggedInSubject.next(false);
  }

  public setAuthToken(token: string) {
    this.authToken = token;
    localStorage.setItem(tokenName, token);
    this.authTokenSubject.next(this.authToken);
    this.loggedInSubject.next(true);
  }

  public getAuthToken() : Observable<string> {
    return this.authTokenSubject.asObservable();
  }

  public isLoggedIn() : Observable<boolean> {
    return this.loggedInSubject.asObservable();
  }

}
