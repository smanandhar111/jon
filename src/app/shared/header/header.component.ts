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
  userData$: Observable<AddToFavsModel[]>;
  cartData$: Observable<AddToFavsModel[]>;
  wishData$: Observable<AddToFavsModel[]>;
  constructor(public authService: AuthService,
              public router: Router,
              public db: AngularFireDatabase,
              private prodItemService: ProditemService,
              afAuth: AngularFireAuth) {
    super(db, afAuth);
  }
  ngOnInit() {
    this.authService.checkAuthState();
    if (this.authService.user) {
    } else {
    }
    this.checkAuth();

    setTimeout(() => {
      this.prodItemService.getUsers();

      this.prodItemService.cartData$.subscribe(data => {
        this.cartItems = data;
      });

      this.prodItemService.wishData$.subscribe(data => {
        this.wishItems = data;
      })
    },500)
  }
  login() {
    this.authService.login();
  }
  logout() {
    this.authService.logout();
    this.router.navigate(['/display']);
  }
  checkAuth() {
    const authCondition = sessionStorage.getItem('auth');
    return authCondition === 'true';
  }
  navToAddProd() {
    if (this.checkAuth()) {
      this.router.navigate(['/add-product']);
    } else {
      this.router.navigate(['/login']);
    }
  }
}
