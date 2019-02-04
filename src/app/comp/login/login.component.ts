import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {AdminCredModel} from '../../models/allModel';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  adminCredentials: AdminCredModel = {
    username: '',
    password: ''
  } ;
  constructor(private authService: AuthService ) { }

  ngOnInit() {
  }
  clearInput(e) {
    const inputName = e.target.previousElementSibling.name;
    if (inputName === 'username') {
      this.adminCredentials.username = '';
    }
    if (inputName === 'password') {
      this.adminCredentials.password = '';
    }
  }
  onSubmit(loginForm: NgForm) {
    this.authService.adminLogin(this.adminCredentials);
    loginForm.resetForm();
  }
}
