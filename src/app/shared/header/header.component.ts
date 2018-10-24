import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';


interface UserResponse {
  base: string;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  // authenticated = this.authService.authenticated;
  // cUser = this.authService.currentUser;

  constructor(public authService: AuthService) {
  }
  ngOnInit() {}
  login() {
    this.authService.login();
  }
  logout() {
    this.authService.logout();
  }
}



// Todo :
// -->AngularFireAuth : make Service
