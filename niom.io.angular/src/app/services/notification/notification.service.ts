import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

import { LoggedInService } from '../auth/logged-in.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  notification: any;

  private notificationSource = new BehaviorSubject<any>(this.notification);
  public newNotification = this.notificationSource.asObservable();


  constructor(
    private router: Router,
    private loggedInService: LoggedInService
    ) { }

  addNotification( notification: any ) {
    
    var slideUpTime = 4500;
    var displayNoneTime = 5000;
    const notificationMessage = document.getElementById('notification-message');
    this.notificationSource.next( notification.status + ' ' + notification.statusText );
    notificationMessage.style.display = "block";
    notificationMessage.style.animation = "notificationSlideDown .5s linear Forwards";

    if(notification.status === 0) {
      this.notificationSource.next('500 Internal Server Error');
      this.router.navigate((['/500-error']));
    }

    if(notification.status === 500) {
      this.router.navigate((['/500-error']));
    }
    else if(notification.status === 401) {
      if(localStorage.getItem('token')){
        localStorage.removeItem('token');
        this.loggedInService.loggedinStatus(false);
      }
      this.router.navigate((['/login']));
    }
    else if(notification.status === 403) {
      if(localStorage.getItem('token')){
        localStorage.removeItem('token');
        this.loggedInService.loggedinStatus(false);
      }
      this.router.navigate((['/login']));
    }
    else if (notification.status === 404) {
      this.router.navigate((['/404-not-found']));
    }
    else {
      notificationMessage.style.background = "rgb(0, 142, 185) !important";
      var slideUpTime = 2500;
      var displayNoneTime = 3000;
      this.notificationSource.next( notification );
    }
    setTimeout(() => {
      notificationMessage.style.animation = "notificationSlideUp .5s linear Forwards";
    }, slideUpTime )
    setTimeout(() => {
      notificationMessage.style.display = "none";
      this.notificationSource.next(null)
    }, displayNoneTime );
  }
}
