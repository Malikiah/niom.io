import { Component, OnInit } from '@angular/core';

import { AdminService } from '../../../../../services/index';
import { UserInterface } from '../../../../../models/index';
import { NotificationService } from '../../../../../services/index';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: UserInterface;
  constructor(
    private adminService: AdminService,
    private notificationService: NotificationService
  ) { }

  ngOnInit() {

    new Promise((resolve, reject) => {
      this.adminService.getUsers(resolve);
    })
    .then(
      (users: UserInterface) => { this.users = users; }
    ) .catch((err) => { this.notificationService.addNotification(err); })
  }

}
