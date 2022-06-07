import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  private email;
  private username;
  private name;
  private surname;
  private phone;
  private city;
  private street;
  private postal_code;
  private password;
  private pass_confirm;
  private img_profile;

  constructor(private _authService: AuthService, private _http: HttpClient, private _route: Router) { }

  ngOnInit() {
  }

  get isAuth() {
    return this._authService.isUserAuthenticated();
  }

  logout(): void {
    this._authService.logout();
  }

  Register() {
    return this._authService.Register(this.email, this.username, this.name, this.surname, this.phone, this.city, this.street, this.postal_code, this.password, this.pass_confirm, this.img_profile)
  }
}
