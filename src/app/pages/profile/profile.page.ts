import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
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

  get messages() {
    console.log(this.userServ.getMessages());
    return this.userServ.getMessages();
  }

  ngOnInit() {
  }

}
