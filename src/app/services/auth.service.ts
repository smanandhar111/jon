import { Injectable } from '@angular/core';
import {AngularFireAuth, AngularFireAuthModule} from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import {Observable} from 'rxjs';
import {AdminCredModel} from '../models/allModel';
import {UserService} from './user.service';
import { UserInfo} from '../models/allModel';

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
  public authenticated: boolean;
  constructor(public af: AngularFireAuth, public userService: UserService) {}
  checkAuthState() {
    this.af.authState.subscribe(
      (auth) => {
        if (auth != null) {
          this.user = this.af.authState;
          this.currentUser = this.af.auth.currentUser;
          sessionStorage.setItem('auth', 'true');
        }
      }
    );
  }
  login() {
    this.af.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then((data) => {
      this.authenticated = true;
      this.userInfo.uid = data.user.uid;
      this.userInfo.email = data.user.email;
     this.userService.addUser(this.userInfo);
    });
  }
  logout() {
    this.af.auth.signOut().then(() => {
      this.authenticated = false;
      sessionStorage.setItem('auth', 'false');
    });
  }
  adminLogin(adminCredentials: AdminCredModel) {
    const adminPromise = this.af.auth.signInWithEmailAndPassword(adminCredentials.username, adminCredentials.password);
    adminPromise.catch(e => {
      console.log('error', e);
    });
    adminPromise.then(data => {
      sessionStorage.setItem('adminAuth', 'true');
    });
  }
}
