import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {DishService} from "../../../../../services/dish.service";
import {AuthService} from "../../../../../services/auth.service";
import {CartService} from "../../../../../services/cart.service";
import {MenuService} from "../../../../../services/menu.service";

@Component({
  selector: 'app-dish',
  templateUrl: './dish.page.html',
  styleUrls: ['./dish.page.scss'],
})
export class DishPage implements OnInit {
  public idRoute;
  public rRoute;
  public quantity;
  public observation;
  public supp;

  constructor(private dishServ: DishService, private cartServ: CartService, private menuServ: MenuService, private route: ActivatedRoute, private auth: AuthService) {
    this.idRoute = this.route.snapshot.queryParams.id;
    this.rRoute = this.route.snapshot.queryParams.r;

    this.dishServ.retriveDish(this.idRoute);
    this.dishServ.retriveSupplements(this.idRoute);
    this.dishServ.retriveAllergens(this.idRoute);

  }

  addCart() {
    console.log(JSON.stringify(this.dish[0].dish_name));
    this.cartServ.addCart(this.idRoute, this.rRoute, this.menuServ.getTableId(), this.quantity, this.observation, this.supp, this.dish[0].dish_name, this.dish[0].price, this.dish[0].imgs )
  }

  get dish() {
    return this.dishServ.getDishes();
  }

  get supplement() {
    return this.dishServ.getSupplements();
  }

  get allergen() {
    return this.dishServ.getAllergen();
  }

  ngOnInit() {
  }

  get isAuth() {
    return this.auth.isUserAuthenticated();
  }

  logout(): void {
    this.auth.logout();
  }
}
