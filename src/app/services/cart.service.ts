import { Injectable } from '@angular/core';
import {AuthService} from "./auth.service";
import {UserService} from "./user.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {stringify} from "@angular/compiler/src/util";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartArr = [];
  constructor(private _authService: AuthService, private _userServ: UserService, private _http: HttpClient, private _router: Router) {

  }

  addCart(idRoute, rRoute, idTable, quant, obs, idSupp, name, price, imgs) {
    this.cartArr = [];
    const data = {
      id_rest: parseInt(rRoute),
      id_client: parseInt(this._userServ.getUser()[0].id),
      id_table: parseInt(idTable),
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

  async retrieveCart(): Promise<boolean>{
    let cart = this.getCart();
    let cartSend = [];

    for (var i = 0; i < cart.length; i++) {
      let actual = {
        'id_dish': cart[i].id_dish,
        'quantity': cart[i].quantity,
        'observation': cart[i].observation,
        'id_supplement': cart[i].id_supplement
      }
      cartSend.push(actual);
    }

    let orderData = {
      'id_rest': cart[0].id_rest,
      'id_client': cart[0].id_client,
      'id_taula': cart[0].id_table,
      'dishes': cartSend
    }

    let data: any = {
      'order': JSON.stringify(orderData)
    }



    console.log(data);

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

    await this._http.post("http://localhost:80/api/order/create", data, options).subscribe(
      (response: any) => {
        console.log(response);
        this._authService.token = response.refreshToken;
        return true;
      }
    );
    return false;
   }

}
