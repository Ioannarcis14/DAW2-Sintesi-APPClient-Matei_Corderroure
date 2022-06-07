import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {
  private email;
  private passwd;
  private userLS;
  constructor(private _authService: AuthService, private _router: Router, private userServ: UserService) { }

  ngOnInit() {
  }

  get isAuth() {
    return this._authService.isUserAuthenticated();
  }

  logout(): void {
    this._authService.logout();
  }

  async login(): Promise<void> {
    try {
      const response = await this._authService.login(this.email, this.passwd);
      if(response) {
        console.log(this._authService.token);
        this._router.navigate(["/home"]);
        this.userLS = localStorage.getItem('LOGIN');
        this.userServ.retriveUser(this.userLS);
      } else {
        alert('Incorrect Credentials')
      }
    } catch(error) {
    }
  }
}
