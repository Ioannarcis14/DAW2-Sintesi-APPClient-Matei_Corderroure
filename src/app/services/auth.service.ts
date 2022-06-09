import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private BASE_URL: string = 'http://localhost:80';
  private _email: string = null;
  private _passwd: string = null;

  constructor(private _http: HttpClient, private _route: Router) {}

  async login(email: string, passwd: string): Promise<boolean> {
    this._email = email;
    this._passwd = passwd;

    let options: any = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };

    const data: any = {
      'login':  this._email,
      'password':  this._passwd
    };


    return new Promise(
      (resolve, reject) => {
        // eslint-disable-next-line no-underscore-dangle
        this._http.post(this.BASE_URL + '/api/login', data, options).subscribe(
          (response: any) => {
            if(response.status == 200) {
              localStorage.setItem('LOGIN', data.login);
              localStorage.setItem('TOKEN', response.token);
              resolve(true);
            }
          else {
              resolve(false);
            }
          },
          (error: any) => {
            reject('Error');
          }
        );
      }
    );
  }

  async restartSession(): Promise<boolean> {
    if(this._email != null && this._passwd != null) {
      const logResult = await this.login(this._email, this._passwd);
      if(logResult) return true;
    }
    return false;
  }

  logout(): void {
    this._email = null;
    this._passwd = null;
    localStorage.removeItem('TOKEN');
    localStorage.removeItem('LOGIN');


  }

  get token(): string {
    return localStorage.getItem('TOKEN');
  }

  set token(token: string) {
    console.log(token);
    localStorage.setItem('TOKEN', token);
  }

  isUserAuthenticated(): boolean {
    return this._email != null && this._passwd != null && localStorage.getItem("TOKEN") != null;
  }

  async Register(email, username, name, surname, phone, city, street, postal_code, password, pass_confirm, img_profile): Promise<boolean> {
    //Constant per gestionar l'endpoint a utiltizar
    const ENDPOINT: string = "/add";

    //Dades de la notícia
    const data: any = {
      'email': email,
      'username': username,
      'name': name,
      'surname': surname,
      'phone': phone,
      'city': city,
      'street': street,
      'postal_code': postal_code,
      'password': password,
      'pass_confirm': pass_confirm,
      'userfile': img_profile

    }

    /*Capçaleres necessàries:
        - Generals (tant per WebServices públics com privats): 'Accept' i 'Content-Type'
        - Específica (per gestionar el TOKEN i l'autenticació): 'Authorization'
    */
    const options = {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+ this.token,
       })
    };

    await this._http.post("http://localhost:80/api/register", data).subscribe(
      (response: any) => {
        console.log(response);
        this.token = response.refreshToken;
        return true;
      }, async (error: any) => {
        const logResult = await this.restartSession();
        if(!logResult) this._route.navigate(["/login"]);
        else return this.Register(email, username, name, surname, phone, city, street, postal_code, password, pass_confirm, img_profile);
      }
    );
    return false;
  }


}
