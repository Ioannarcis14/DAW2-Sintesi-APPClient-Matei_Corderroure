import { Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UserService} from "./services/user.service";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public idRoute;
  public userLS;

  constructor(private userServ: UserService, private route: ActivatedRoute ) {
    this.idRoute = this.route.snapshot.queryParams.id;
    this.userLS = localStorage.getItem('LOGIN');
    console.log(this.userLS);
  }

  get user() {
    console.log(this.userServ.getUser());
    return this.userServ.getUser();
  }

  ngOnInit() {
  }
}
