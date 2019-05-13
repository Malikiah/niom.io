import { Component, OnInit } from '@angular/core';

import { AdminService } from '../../../../../services/index';
import { UserInterface } from '../../../../../models/index';
import { NotificationService } from '../../../../../services/index';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {

  pages: any;
  constructor(
    private adminService: AdminService,
    private notificationService: NotificationService
  ) { }

  ngOnInit() {
    new Promise((resolve, reject) => {
      this.adminService.getUsers(resolve);
    })
    .then(
      (pages: any) => { this.pages = pages; }
    ) .catch((err) => { this.notificationService.addNotification(err); })
  }

}
