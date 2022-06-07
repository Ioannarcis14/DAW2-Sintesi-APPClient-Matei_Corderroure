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

  async Register(): Promise<boolean> {
    //Constant per gestionar l'endpoint a utiltizar
    const ENDPOINT: string = "/add";

    //Dades de la notícia
    const data: any = {
      'email': this.email,
      'username': this.username,
      'name': this.name,
      'surname': this.surname,
      'phone': this.phone,
      'city': this.city,
      'street': this.street,
      'postal_code': this.postal_code,
      'password': this.password,
      'pass_confirm': this.pass_confirm,
      'img_profile': this.img_profile

    }

    /*Capçaleres necessàries:
        - Generals (tant per WebServices públics com privats): 'Accept' i 'Content-Type'
        - Específica (per gestionar el TOKEN i l'autenticació): 'Authorization'
    */
    const options = {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization':'Bearer '+ this._authService.token,
        'Access-Control-Allow-Origin': '*',
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
        "Access-Control-Allow-Headers": "X-API-KEY, Origin,X-Requested-With, Content-Type, Accept, Access-Control-Requested-Method, Authorization"
      })
    };

    await this._http.post("http://localhost:80/register", data, options).subscribe(
      (response: any) => {
        console.log(response);
        this._authService.token = response.refreshToken;
        return true;
      }, async (error: any) => {
        const logResult = await this._authService.restartSession();
        if(!logResult) this._route.navigate(["/login"]);
        else return this.Register();
      }
    );
    return false;
  }
}
