import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  private email;
  private passwd;

  constructor(private _authService: AuthService, private _router: Router) { }

  ngOnInit() {
  }

  async login(): Promise<void> {
    try {
      const response = await this._authService.login(this.email, this.passwd);
      if(response) {
        this._router.navigate(["/home"]);
      }
    } catch(error) {
      console.log("Error!");
    }
  }
}