import { Injectable } from '@angular/core';
import { AuthService } from "./auth.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { Router } from "@angular/router";
import { Menu } from "../models/menu";

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private BASE_URL: string = "http://localhost:80/api/category/getAll";
  private _categories= [];
  private _catName = [];
  private _tables;
  private _tableId;

  constructor(private _authService: AuthService, private _http: HttpClient, private _router: Router) {}

  retriveCategories(urlPar): void {
  this._categories = [];
    this._http.get(this.BASE_URL+"/"+urlPar).subscribe(
      (category: any) => {
        for(let i = 0; i < category.data.length; i++) {
          const data: Menu = {
            id: category.data[i].id,
            id_restaurant: category.data[i].id_restaurant,
            id_category_parent: category.data[i].id_category_parent,
            name: category.data[i].name,
            observation_msg: category.data[i].observation_msg,
            dish_name: category.data[i].dish_name,
            dish_id: category.data[i].dish_id,
            dish_price: category.data[i].dish_price,
            dish_description: category.data[i].dish_description,
            dish_short_description: category.data[i].dish_short_description,

            imgs: category.data[i].imgs.split(','),

          };
          console.log(data.name);
          if (!this._catName.includes(data.name)) {
            this._catName.push(data.name);
          }

          this._categories.push(data);
        }
      }
    );
  }

  async retrieveTables(idR): Promise<boolean>{
    this._tables = [];
    const data: any = {
      'id_restaurant': parseInt(idR),
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

    await this._http.post("http://localhost:80/api/taula/getOnline", data, options).subscribe(
      (response: any) => {
        console.log(response);
        this._tables.push(response.messages);
        this._tableId = response.data.id;
        this._authService.token = response.refreshToken;
        return true;
      }
    );
    return false;
  }

  getTables() {
    return this._tables;
  }

  getTableId() {
    return this._tableId;
  }

  getCategories(): any {
    return this._categories;
  }

  getCatNames(): any {
    return this._catName;
  }
}
