import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;
  constructor() { }

  ngOnInit() {
  }
  clearInput(e) {
    const inputName = e.target.previousElementSibling.name;
    if (inputName === 'username') {
      this.username = '';
    }
    if (inputName === 'password') {
      this.password = '';
    }
  }
}
