import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

import { NotificationService } from '../notification/notification.service';
import { UserInterface } from '../../models/index';
import { LoggedInService } from './logged-in.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( 
    private notificationService: NotificationService,
    private httpClient: HttpClient,
    private loggedInService: LoggedInService
   ) { }

  checkJWT(): UserInterface {
    let decodedJWT:UserInterface = <any>this.httpClient.get(window.location.protocol + '//' + window.location.hostname + ':3000/authenticate')
    .toPromise()
    .then(
      (user: UserInterface) => {
        this.loggedInService.loggedinStatus(true);
        return user;
      }
    ).catch((err) => { this.notificationService.addNotification(err); 
    })

    return decodedJWT;
  }

}
