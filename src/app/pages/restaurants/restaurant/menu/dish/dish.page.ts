import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {DishService} from "../../../../../services/dish.service";
import {AuthService} from "../../../../../services/auth.service";

@Component({
  selector: 'app-dish',
  templateUrl: './dish.page.html',
  styleUrls: ['./dish.page.scss'],
})
export class DishPage implements OnInit {
  public idRoute;
  public quantity;
  public observation;
  public supp;

  constructor(private dishServ: DishService, private route: ActivatedRoute, private auth: AuthService) {
    this.idRoute = this.route.snapshot.queryParams.id;
    this.dishServ.retriveDish(this.idRoute);
    this.dishServ.retriveSupplements(this.idRoute);
    this.dishServ.retriveAllergens(this.idRoute);

  }

  addCart() {

  }

  get dish() {
    console.log(this.dishServ.getDishes());
    return this.dishServ.getDishes();
  }

  get supplement() {
    console.log(this.dishServ.getSupplements());
    return this.dishServ.getSupplements();
  }

  get allergen() {
    console.log(this.dishServ.getAllergen());
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
