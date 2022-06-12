import { Injectable } from '@angular/core';
import { AuthService } from "./auth.service";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Menu } from "../models/menu";

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private BASE_URL: string = "http://localhost:80/api/category/getAll";
  private _categories= [];
  private _catName = [];

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


  getCategories(): any {
    return this._categories;
  }

  getCatNames(): any {
    return this._catName;
  }
}
