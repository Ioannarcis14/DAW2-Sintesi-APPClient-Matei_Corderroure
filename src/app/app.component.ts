import { Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UserService} from "./services/user.service";
import {AuthService} from "./services/auth.service";
import { ModalController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

import {CartService} from "./services/cart.service";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public idRoute;
  public userLS;

  constructor(public toastController: ToastController, private userServ: UserService, private modalController: ModalController, private cartServ: CartService, private route: ActivatedRoute, private auth: AuthService ) {
    this.idRoute = this.route.snapshot.queryParams.id;
    this.userLS = localStorage.getItem('LOGIN');
    this.cart;
    console.log(this.userLS);
  }

  remove(elem) {
    this.cartServ.spliceCart(elem);

    this.modalController.dismiss({
      'dismissed': true
    });
  }

  get cart() {
    return this.cartServ.getCart();
  }

  get user() {
    console.log(this.userServ.getUser());
    return this.userServ.getUser();
  }

  purchase() {
    this.cartServ.retrieveCart();
    this.presentToast();
  }

  get isAuth() {
    return this.auth.isUserAuthenticated();
  }

  logout(): void {
    this.auth.logout();
  }

  ngOnInit() {
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'We are processing your order',
      duration: 2000
    });
    toast.present();
  }


}
