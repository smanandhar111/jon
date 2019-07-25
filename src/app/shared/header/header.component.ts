import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import {Router} from '@angular/router';
import {UserInformation} from '../../comp/abstracts/users';
import {AngularFireDatabase} from '@angular/fire/database';
import {AngularFireAuth} from '@angular/fire/auth';
import {AddToFavsModel} from '../../models/allModel';
import {ProditemService} from '../../services/proditem.service';
import {Observable} from 'rxjs';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent extends UserInformation implements OnInit {
  userData;
  cartItems: AddToFavsModel[];
  wishItems: AddToFavsModel[];
  constructor(public authService: AuthService,
              public router: Router,
              public db: AngularFireDatabase,
              private prodItemService: ProditemService,
              afAuth: AngularFireAuth) {
    super(db, afAuth);
  }
  ngOnInit() {
    // Todo: Refactor this!
    this.authService.checkAuthState();
    if (this.authService.user) {
    } else {
    }
    if (this.checkAuth() === true) {
      this.getUserData();
    }
  }

  getUserData(): void {
    setTimeout(() => {
      this.prodItemService.getUsers();
      this.prodItemService.cartData$.subscribe(data => {
        this.cartItems = data;
        console.log(this.cartItems);
      });

      this.prodItemService.wishData$.subscribe(data => {
        this.wishItems = data;
      })
    },500)
  }
  login() {
    this.authService.login();
    this.authService.login$.then(() => {
      this.getUserData();
    })
  }
  logout() {
    this.authService.logout();
    this.router.navigate(['/display']);
  }
  //Todo: Refactor this into the AuthService
  checkAuth(): boolean {
    const authCondition = sessionStorage.getItem('auth');
    return authCondition === 'true';
  }

  checkAdminAuth(): boolean {
    const adminAuthCondition = sessionStorage.getItem('adminAuth');
    return adminAuthCondition === 'true';
  }
  navToAddProd(): void {
    this.checkAdminAuth() ? this.router.navigate(['/add-product'])
      : this.router.navigate(['/login']);
  }
}
