import { Injectable } from '@angular/core';
import {AngularFireAuth, AngularFireAuthModule} from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: Observable<firebase.User>;
  currentUser;
  // public authenticated: Observable <boolean>;
  public authenticated: boolean;
  constructor(public af: AngularFireAuth) {}
  checkAuthState() {
    this.af.authState.subscribe(
      (auth) => {
        if (auth != null) {
          debugger;
          this.user = this.af.authState;
          this.currentUser = this.af.auth.currentUser;
        }
      }
    );
  }
  login() {
    this.af.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(() => {
      this.authenticated = true;
    });
  }
  logout() {
    this.af.auth.signOut().then(() => {
      this.authenticated = false;
    });
  }
}
