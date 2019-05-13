import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { NotificationService } from '../notification/notification.service';
import { UserInterface } from '../../models/index';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(
    private httpClient: HttpClient,
    private notificationService: NotificationService
  ) { }

  getUsers(resolve?) {
    this.httpClient.get(window.location.protocol + "//" + window.location.hostname + ":3000/users")
    .toPromise()
    .then(
      (users: UserInterface) => { resolve(users); }
    ) .catch( (err) => { this.notificationService.addNotification(err) } );

  }

  getPages(resolve?) {
    this.httpClient.get(window.location.protocol + "//" + window.location.hostname + ":3000/pages")
    .toPromise()
    .then(
      (pages: any) => { resolve(pages); }
    ) .catch( (err) => { this.notificationService.addNotification(err) } );

  }


}
