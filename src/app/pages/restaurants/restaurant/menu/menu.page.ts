import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {MenuService} from "../../../../services/menu.service";
import {AuthService} from "../../../../services/auth.service";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
public idRoute;

  constructor(private menuServ: MenuService, private route: ActivatedRoute, private auth: AuthService) {
    this.idRoute = this.route.snapshot.queryParams.id;
    this.menuServ.retriveCategories(this.idRoute);
  }

  get menu() {
    console.log(this.menuServ.getCategories());
    return this.menuServ.getCategories();
  }

  get categoryName() {
    console.log(this.menuServ.getCatNames());
    return this.menuServ.getCatNames();
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
