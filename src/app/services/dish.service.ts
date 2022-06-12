import { Injectable } from '@angular/core';
import {AuthService} from "./auth.service";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {Dish} from "../models/dish";
import {Supplements} from "../models/supplements";
import {Allergen} from "../models/allergen";

@Injectable({
  providedIn: 'root'
})
export class DishService {
  private BASE_URL: string = "http://localhost:80/api/dish/getAllRestaurant";
  private _dish = [];
  private _supp = [];
  private _allergen = [];

  constructor(private _authService: AuthService, private _http: HttpClient, private _router: Router) {}

  retriveDish(dish_id): void {
    this._dish = [];
    this._http.get(this.BASE_URL+"/"+dish_id).subscribe(
      (dish: any) => {
        for(let i = 0; i < dish.data.length; i++) {
          const data: Dish = {
            dish_id: dish.data[i].dish_id,
            dish_desc: dish.data[i].dish_desc,
            dish_name: dish.data[i].dish_name,
            price: dish.data[i].price,
            imgs: dish.data[i].imgs.replace('public/',''),
            short_description: dish.data[i].short_description
          };
          this._dish.push(data);
        }
      }
    );
  }

  retriveSupplements(dish_id): void {
    this._supp = [];
    this._http.get("http://localhost:80/api/supplement/getAll/"+dish_id).subscribe(
      (dish_s: any) => {
        for(let i = 0; i < dish_s.data.length; i++) {
          const data: Supplements = {
            id: dish_s.data[i].id,
            name: dish_s.data[i].name,
            desc: dish_s.data[i].desc,
            price: dish_s.data[i].price,
          };
          this._supp.push(data);
        }
      }
    );
  }

  retriveAllergens(dish_id): void {
    this._allergen = [];
    this._http.get("http://localhost:80/api/allergen/getAll/"+dish_id).subscribe(
      (dish_a: any) => {
        for(let i = 0; i < dish_a.data.length; i++) {
          const data: Allergen = {
            id: dish_a.data[i].id,
            name: dish_a.data[i].name,
          };
          this._allergen.push(data);
        }
      }
    );
  }

  getDishes(): any {
    return this._dish;
  }

  getSupplements(): any {
    return this._supp;
  }

  getAllergen(): any{
    return this._allergen;
  }
}
