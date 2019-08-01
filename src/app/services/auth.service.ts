import { Injectable } from '@angular/core';
import {AngularFireAuth, AngularFireAuthModule} from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import {Observable} from 'rxjs';
import {AdminCredModel} from '../models/allModel';
import {UserService} from './user.service';
import { UserInfo} from '../models/allModel';
import {Router} from '@angular/router';
import UserCredential = firebase.auth.UserCredential;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: Observable<firebase.User>;
  currentUser;
  userInfo: UserInfo = {
    uid: '',
    email: ''
  };
  login$: Promise<UserCredential>;
  public authenticated: boolean;
  constructor(public af: AngularFireAuth,
              public userService: UserService,
              public router: Router) {}

  checkAuthState() {
    this.af.authState.subscribe(
      (auth) => {
        if (auth != null) {
          this.user = this.af.authState;
          this.currentUser = this.af.auth.currentUser;
          if(this.currentUser.emailVerified ) {
            sessionStorage.setItem('auth', 'true');
          }
        }
      }
    );
  }
  login() {
    // this.af.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then((data) => {
    //   this.authenticated = true;
    // });
    this.login$ = this.af.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }
  logout() {
    this.af.auth.signOut().then(() => {
      this.authenticated = false;
      sessionStorage.setItem('auth', 'false');
      sessionStorage.setItem('adminAuth', 'false');
    });
  }
  adminLogin(adminCredentials: AdminCredModel) {
    const adminPromise = this.af.auth.signInWithEmailAndPassword(adminCredentials.username, adminCredentials.password);
    adminPromise.catch(e => {
      console.log('error', e);
      if (e.code === 'auth/wrong-password') {
        alert(e.message);
      }
    });
    adminPromise.then(data => {
      // sessionStorage.setItem('auth', 'false');
      sessionStorage.setItem('adminAuth', 'true');
      this.router.navigate(['/add-product']);
    });
  }
}
