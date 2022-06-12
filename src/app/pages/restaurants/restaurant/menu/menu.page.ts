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
public areTables;

  constructor(private menuServ: MenuService, private route: ActivatedRoute, private auth: AuthService) {
    this.idRoute = this.route.snapshot.queryParams.id;
    this.menuServ.retriveCategories(this.idRoute);
    this.areTables = this.menuServ.retrieveTables(this.idRoute);
  }

  get menu() {
    return this.menuServ.getCategories();
  }

  get tables() {
    return this.menuServ.getTables();
  }
  get categoryName() {
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
