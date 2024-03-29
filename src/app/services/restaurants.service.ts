import { Injectable } from '@angular/core';
import { AuthService } from "./auth.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
import { Restaurants } from '../models/restaurants';

@Injectable({
  providedIn: 'root'
})

export class RestaurantsService {
  private BASE_URL: string = "http://localhost:80/api/restaurant/getAll";
  private _restaurants = [];

  constructor(private _authService: AuthService, private _http: HttpClient, private _router: Router) {}

  retriveRestaurants(): void {
    this._http.get('http://localhost:80/api/restaurant/getAllRestReviews').subscribe(

      (restaurant: any) => {
        for(let i = 0; i < restaurant.data.length; i++) {
          const data: Restaurants = {
            id: restaurant.data[i].id,
            name: restaurant.data[i].name,
            city: restaurant.data[i].city,
            street: restaurant.data[i].street,
            postal_code: restaurant.data[i].postal_code,
            description: restaurant.data[i].description,
            phone: restaurant.data[i].phone,
            first_img: restaurant.data[i].img_gallery.split(','),
            note: parseFloat(restaurant.data[i].nota).toFixed(1),
          };
          this._restaurants.push(data);
        }
      }
    );
  }

  getRestaurants(): any {
    return this._restaurants;
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
