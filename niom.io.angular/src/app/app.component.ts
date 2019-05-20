import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { NotificationService, AuthService, LoadingService, UserService, LoggedInService } from './services/index';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})



export class AppComponent implements OnInit {
  title = 'niom';
  notification;
  isLoggedin;
  profile;
  banner;

  constructor( 
    private notificationService: NotificationService,
    private authService: AuthService,
    private loadingService: LoadingService,
    private userService: UserService,
    private router: Router,
    private loggedInService: LoggedInService,
    ) {
      
  }

ngOnInit() {
  
  
  if(localStorage.getItem('token')) {
    this.authService.checkJWT();
    this.userService.getProfile();
    console.log(this.profile);
  }
  this.notificationService.newNotification.subscribe( notification => this.notification = notification );
  this.loggedInService.newLogin.subscribe( isLoggedin => this.isLoggedin = isLoggedin );
  this.userService.newProfile.subscribe( profile => this.profile = profile);

}

logout() {
  localStorage.removeItem('token');
  this.loggedInService.loggedinStatus(false);
  this.notificationService.addNotification('Logged Out');
  this.router.navigate((['/']))
}

}