import { Component, OnInit } from '@angular/core';
import { RestaurantsService } from "../../services/restaurants.service";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.page.html',
  styleUrls: ['./restaurants.page.scss'],
})
export class RestaurantsPage implements OnInit {

  constructor(private restaurantServ: RestaurantsService, private auth: AuthService) {
    this.restaurantServ.retriveRestaurants();
  }

  get restaurants() {
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
}
