import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import {Router} from '@angular/router';
import {UserInformation} from '../../comp/abstracts/users';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireDatabase} from '@angular/fire/database';
import {AngularFireAuth} from '@angular/fire/auth';
import {AddToFavsModel} from '../../models/allModel';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent extends UserInformation implements OnInit {
  userData;
  wishlisted: AddToFavsModel[] = [];
  constructor(public authService: AuthService,
              public router: Router,
              public afs: AngularFirestore,
              public db: AngularFireDatabase,
              afAuth: AngularFireAuth) {
    super(afs, db, afAuth);
  }
  ngOnInit() {
    this.authService.checkAuthState();
    if (this.authService.user) {
    } else {
    }
    // this.authService.currentUser.subscribe(data =>  {
    //   this.userData = data;
    // });
    this.checkAuth();

    // calling userService
    setTimeout(() => {
      this.getCart();
      this.items.subscribe(data => {
        this.wishlisted = data;
      });
    }, 1000);
  }
  login() {
    this.authService.login();
  }
  logout() {
    this.authService.logout();
  }
  checkAuth() {
    const authCondition = sessionStorage.getItem('auth');
    if (authCondition === 'true') {
      return true;
    } else {
      return false;
    }
  }
  navToAddProd() {
    if (this.checkAuth()) {
      this.router.navigate(['/add-product']);
    } else {
      this.router.navigate(['/login']);
    }
  }
}
