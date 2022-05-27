import { Component, OnInit } from '@angular/core';
import { RestaurantsService } from "../../services/restaurants.service";

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.page.html',
  styleUrls: ['./restaurants.page.scss'],
})
export class RestaurantsPage implements OnInit {

  constructor(private restaurantServ: RestaurantsService) {
    this.restaurantServ.retriveRestaurants();
  }

  get restaurants() {
    console.log(this.restaurantServ.getRestaurants());
    return this.restaurantServ.getRestaurants();
  }


  ngOnInit() {
    // this.restaurantServ.retriveRestaurant();
  }

}
