import { Component, OnInit } from '@angular/core';
import { RequestService } from '../../../services/request.service';
import { API } from '../../../constants/API';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.sass']
})
export class ListUsersComponent implements OnInit {
  users: any[] = [];

  constructor(private requestService: RequestService) { }

  ngOnInit() {
    this.requestService.getRequest(API.URL_USERS_LIST)
      .subscribe((data: any[]) => {
        this.users = data;
      });
  }
}
