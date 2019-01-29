import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  userData;
  constructor(public authService: AuthService) {
  }
  ngOnInit() {
    this.authService.checkAuthState();
    if (this.authService.user) {
      console.log(this.authService.currentUser);
    } else {
      console.log('not logged in');
    }
    // this.authService.currentUser.subscribe(data => {
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
}
