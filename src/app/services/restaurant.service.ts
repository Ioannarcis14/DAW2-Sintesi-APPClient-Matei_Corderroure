import { Injectable } from '@angular/core';
import {AuthService} from "./auth.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})

export class RestaurantService {
  private BASE_URL: string = "http://localhost:80/api/restaurant/getAll";
  private _restaurants: any[] = [];

  constructor(private _authService: AuthService, private _http: HttpClient, private _router: Router) {}

  retriveRestaurant(): void {
    this._http.get(this.BASE_URL).subscribe(
      (restaurant: any) => {
        this._restaurants = restaurant.data;
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

  get restaurants() {
    return this._restaurants;
  }

}
