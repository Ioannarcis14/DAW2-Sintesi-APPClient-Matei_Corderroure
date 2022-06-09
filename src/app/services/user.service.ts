import { Injectable } from '@angular/core';
import {AuthService} from "./auth.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {User} from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private BASE_URL: string = "http://localhost:80/api/users/getUser";
  private _user = [];
  private _nr;
  private _message = [];

  constructor(private _authService: AuthService, private _http: HttpClient, private _router: Router) { }

  retriveUser(user): void {


    let options = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization':'Bearer '+ this._authService.token
        })
      };


    this._http.get(this.BASE_URL+"/"+user, options).subscribe(
      (profile: any) => {
          const data: User = {
            id: profile.data.id,
            name: profile.data.name,
            surname: profile.data.surname,
            email: profile.data.email,
            username: profile.data.email,
            img_profile: profile.data.imgs,
            phone: profile.data.phone,
            city: profile.data.city,
            street: profile.data.street,
            postal_code: profile.data.postal_code,
            password: profile.data.password,
            status: profile.data.status,
            status_message: profile.data.status_message,
            active: profile.data.active
          };
          this._user.push(data);
        }

    );


    this._http.get("http://localhost:80/api/messages/getMessageNumber"+"/"+user).subscribe(
      (msg: any) => {
        console.log(msg);

        const data = {
          number: msg.data[0].total,
        };
        this._nr = data;
      }

    );

    this._http.get("http://localhost:80/api/messages/getMessage"+"/"+user).subscribe(
      (msg: any) => {
        console.log(msg);
        for (let i = 0; i < msg.data.length; i++) {
          const data = {
            id: msg.data[i].id_user,
            id_rest: msg.data[i].id_restaurant,
            theme: msg.data[i].theme,
            message: msg.data[i].message

          };
          this._message.push(data);
        }
      }
    );
  }

  getUser(): any {
    return this._user;
  }

  getMessages(): any {
    return this._nr;
  }

  getMessagesUser(): any {
    return this._message;
  }
}
