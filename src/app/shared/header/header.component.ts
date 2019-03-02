import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  userData;
  constructor(public authService: AuthService,
              public router: Router) {
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
