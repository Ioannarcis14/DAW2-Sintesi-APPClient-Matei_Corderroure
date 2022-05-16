import { Component, OnInit } from '@angular/core';
import {RestaurantService} from "../../services/restaurant.service";

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.page.html',
  styleUrls: ['./restaurants.page.scss'],
})
export class RestaurantsPage implements OnInit {
  public note = 9;
  // constructor(private restaurantServ: RestaurantService ) {
  //   console.log(this.restaurantServ.retriveRestaurant());
  // }

  ngOnInit() {
  }

}
