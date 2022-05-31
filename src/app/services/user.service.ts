import { Injectable } from '@angular/core';
import {AuthService} from "./auth.service";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {User} from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private BASE_URL: string = "http://localhost:80/api/users/getUser";
  private _user = [];

  constructor(private _authService: AuthService, private _http: HttpClient, private _router: Router) { }

  retriveUser(user): void {
    this._http.get(this.BASE_URL+"/"+user).subscribe(
      (profile: any) => {
        for(let i = 0; i < profile.data.length; i++) {
          const data: User = {
            id: profile.data[i].id,
            name: profile.data[i].name,
            surname: profile.data[i].surname,
            email: profile.data[i].email,
            username: profile.data[i].email,
            img_profile: profile.data[i].imgs.replace('public/',''),
            phone: profile.data[i].phone,
            city: profile.data[i].city,
            street: profile.data[i].street,
            postal_code: profile.data[i].postal_code,
            password: profile.data[i].imgs.password,
            status: profile.data[i].status,
            status_message: profile.data[i].status_message,
            active: profile.data[i].active
          };
          this._user.push(data);
        }
      }
    );
  }

  getUser(): any {
    return this._user;
  }
}
