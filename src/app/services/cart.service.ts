import { Injectable } from '@angular/core';
import {AuthService} from "./auth.service";
import {UserService} from "./user.service";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartArr = [];
  constructor(private _authService: AuthService, private _userServ: UserService, private _http: HttpClient, private _router: Router) {

  }

  addCart(idRoute, rRoute, quant, obs, idSupp, name, price, imgs) {
    this.cartArr = [];
    const data = {
      id_rest: parseInt(rRoute),
      id_client: parseInt(this._userServ.getUser()[0].id),
      id_dish: parseInt(idRoute),
      quantity: parseInt(quant),
      observation: obs,
      id_supplement: parseInt(idSupp),
      name: name,
      price: price,
      imgs: imgs
    };

    if (this.getCart() != null) {
      if (this.getCart().length == 0) {
        this.cartArr.push(this.getCart());
      } else {
        this.cartArr = this.getCart();
      }
    }


    console.log(this.cartArr);
    this.cartArr.push(data);

   localStorage.setItem('cart', JSON.stringify(this.cartArr));
  }

  getCart() {
    let cart = localStorage.getItem('cart');
    return JSON.parse(cart);
  }

  spliceCart(idx) {
    let cart = this.getCart();
    cart.splice(idx, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
  }
}
