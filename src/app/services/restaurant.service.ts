import { Injectable } from '@angular/core';
import { AuthService } from "./auth.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
import { Restaurant } from '../models/restaurant';
import {UserService} from "./user.service";

@Injectable({
  providedIn: 'root'
})

export class RestaurantService {
  private BASE_URL: string = "http://localhost:80/api/restaurant/getAll";
  private _restaurants = [];

  constructor(private _authService: AuthService, private _userServ: UserService, private _http: HttpClient, private _router: Router) {}

  retriveRestaurant(): void {
    this._restaurants = [];
    this._http.get(this.BASE_URL).subscribe(
      (restaurant: any) => {
        for(let i = 0; i < restaurant.data.length; i++) {
          const data: Restaurant = {
            id: restaurant.data[i].id,
            name: restaurant.data[i].name,
            city: restaurant.data[i].city,
            street: restaurant.data[i].street,
            postal_code: restaurant.data[i].postal_code,
            description: restaurant.data[i].description,
            phone: restaurant.data[i].phone,
            twitter: restaurant.data[i].twitter,
            facebook: restaurant.data[i].facebook,
            instagram: restaurant.data[i].instagram,
            img_gallery: restaurant.data[i].img_gallery.split(','),
            first_img: restaurant.data[i].img_gallery.split(','),
            discharged: restaurant.data[i].discharged,
          };
          this._restaurants.push(data);
        }
      }
    );
  }


  getRestaurants(): any {
    return this._restaurants;
  }

  async rate(score, review, idRoute): Promise<boolean> {
    //Constant per gestionar l'endpoint a utiltizar
    const ENDPOINT: string = "/add";
    //Dades de la notícia
    const data: any = {
      'rating': score,
      'observation': review,
      'id_user': this._userServ.getUser()[0].id,
      'id_restaurant': parseInt(idRoute)
    }

    /*Capçaleres necessàries:
        - Generals (tant per WebServices públics com privats): 'Accept' i 'Content-Type'
        - Específica (per gestionar el TOKEN i l'autenticació): 'Authorization'
    */

        const options = {
          headers: new HttpHeaders({
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+ this._authService.token,
          })
        };

    await this._http.post("http://localhost:80/api/users/createValorations", data, options).subscribe(
      (response: any) => {
        console.log(response);
        this._authService.token = response.refreshToken;
        return true;
      }
    );
    return false;
  }
  // async addPieceOfRestaurants(title: string, body: string): Promise<boolean> {
  //   //Constant per gestionar l'endpoint a utiltizar
  //   const ENDPOINT: string = "/add";
  //
  //   //Dades de la notícia
  //   const data: any = {
  //     'title': title,
  //     'body': body
  //   }
  //
  //   /*Capçaleres necessàries:
  //       - Generals (tant per WebServices públics com privats): 'Accept' i 'Content-Type'
  //       - Específica (per gestionar el TOKEN i l'autenticació): 'Authorization'
  //   */
  //   const options: any = {
  //     headers: new HttpHeaders()
  //       .set('Accept', 'application/json')
  //       .set('Content-Type', 'application/json')
  //       .set('Authorization', 'Bearer ' + this._authService.token)
  //   };
  //
  //   await this._http.post(this.BASE_URL + ENDPOINT, data, options).subscribe(
  //     (response: any) => {
  //       console.log(response);
  //       this._authService.token = response.refreshToken;
  //       return true;
  //     }, async (error: any) => {
  //       const logResult = await this._authService.restartSession();
  //       if(!logResult) this._router.navigate(["/login"]);
  //       else return this.addPieceOfRestaurants(title, body);
  //     }
  //   );
  //   return false;
  // }



}
