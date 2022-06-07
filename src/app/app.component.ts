import { Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UserService} from "./services/user.service";
import {AuthService} from "./services/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public idRoute;
  public userLS;

  constructor(private userServ: UserService, private route: ActivatedRoute, private auth: AuthService ) {
    this.idRoute = this.route.snapshot.queryParams.id;
    this.userLS = localStorage.getItem('LOGIN');
    console.log(this.userLS);
  }

  get user() {
    console.log(this.userServ.getUser());
    return this.userServ.getUser();
  }

  get isAuth() {
    return this.auth.isUserAuthenticated();
  }

  logout(): void {
    this.auth.logout();
  }

  ngOnInit() {
  }
}
