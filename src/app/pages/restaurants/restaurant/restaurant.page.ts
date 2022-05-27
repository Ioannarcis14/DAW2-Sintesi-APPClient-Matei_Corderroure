import { Component, OnInit } from '@angular/core';
import {RestaurantService} from "../../../services/restaurant.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.page.html',
  styleUrls: ['./restaurant.page.scss'],
})
export class RestaurantPage implements OnInit {
  public idRoute;

  constructor(private restaurantServ: RestaurantService, private route: ActivatedRoute) {
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

}
