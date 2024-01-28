import { Component, OnInit } from '@angular/core';
import { RequestService } from '../../../services/request.service';
import { API } from '../../../constants/API';

import { User } from '../../../interfaces/user'; // adjust the path as needed

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.sass']
})
export class ListUsersComponent implements OnInit {
  users: User[] = [];

  constructor(private requestService: RequestService) { }

  ngOnInit() {
    this.requestService.getRequest(API.URL_USERS_LIST)
      .subscribe((data: User[]) => {
        this.users = data;
      });
  }
}
