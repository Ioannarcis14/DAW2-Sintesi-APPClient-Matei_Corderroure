import { Component, OnInit } from '@angular/core';
import {RestaurantService} from "../../../services/restaurant.service";

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.page.html',
  styleUrls: ['./restaurant.page.scss'],
})
export class RestaurantPage implements OnInit {

  constructor(private restaurantServ: RestaurantService) {
    this.restaurantServ.retriveRestaurant();
  }

  get restaurants() {
    console.log(this.restaurantServ.getRestaurants());
    return this.restaurantServ.getRestaurants();
  }

  ngOnInit() {
    // this.restaurantServ.retriveRestaurant();
  }

}
