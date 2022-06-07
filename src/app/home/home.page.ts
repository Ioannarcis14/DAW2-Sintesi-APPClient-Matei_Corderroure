import { Component } from '@angular/core';
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private auth: AuthService) {}

  get isAuth() {
    return this.auth.isUserAuthenticated();
  }

  logout(): void {
    this.auth.logout();
  }
}
