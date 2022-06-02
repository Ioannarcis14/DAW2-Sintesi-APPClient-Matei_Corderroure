import { Component, OnInit } from '@angular/core';
import {UserService} from "../../../services/user.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-messages',
  templateUrl: './messages.page.html',
  styleUrls: ['./messages.page.scss'],
})
export class MessagesPage implements OnInit {
  public userLS;

  constructor(private userServ: UserService, private route: ActivatedRoute ) {
    this.userLS = localStorage.getItem('LOGIN');
    console.log(this.userLS);
  }

  get messagesUser() {
    console.log(this.userServ.getMessagesUser());
    return this.userServ.getMessagesUser();
  }

  ngOnInit() {
  }
}
