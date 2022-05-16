import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private BASE_URL: string = 'http://localhost:8080';
  private _email: string = null;
  private _passwd: string = null;

  constructor(private _http: HttpClient) {}

  async login(email: string, passwd: string): Promise<boolean> {
    this._email = email;
    this._passwd = passwd;

    let options: any = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    }

    const data: any = {
      'email':  this._email,
      'password':  this._passwd
    }

    return new Promise(
      (resolve, reject) => {
        // eslint-disable-next-line no-underscore-dangle
        this._http.post(this.BASE_URL + '/login', data, options).subscribe(
          (response: any) => {
            if(response.status == 200) {
              localStorage.setItem('TOKEN', response.token);
              resolve(true);
            }
            else resolve(false);
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


}
