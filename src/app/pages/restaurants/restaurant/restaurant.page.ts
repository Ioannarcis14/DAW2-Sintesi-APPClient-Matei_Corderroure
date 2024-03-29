import { Component, OnInit } from '@angular/core';
import {RestaurantService} from "../../../services/restaurant.service";
import {ActivatedRoute} from "@angular/router";
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.page.html',
  styleUrls: ['./restaurant.page.scss'],
})
export class RestaurantPage implements OnInit {
  public idRoute;
  private review;
  private score;

  constructor(private restaurantServ: RestaurantService, private route: ActivatedRoute, private auth: AuthService) {
    this.restaurantServ.retriveRestaurant();
    this.idRoute = this.route.snapshot.queryParams.id;

  }

  get restaurants() {
    console.log(this.restaurantServ.getRestaurants());
    return this.restaurantServ.getRestaurants();
  }

  ngOnInit() {
    // this.restaurantServ.retriveRestaurant();
  }

  get isAuth() {
    return this.auth.isUserAuthenticated();
  }

  logout(): void {
    this.auth.logout();
  }

  rate() {
    this.restaurantServ.rate(this.score, this.review, this.idRoute);
  }

}
