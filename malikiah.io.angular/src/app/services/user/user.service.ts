import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { NotificationService } from '../notification/notification.service';
import { UserInterface } from '../../models';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  profile: UserInterface;

  private profileSource = new BehaviorSubject<UserInterface>(this.profile);
  newProfile = this.profileSource.asObservable();

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private notificationService: NotificationService,
  ) { }


  registerUser(registerForm: NgForm){
    console.log(registerForm.value)
      if( registerForm.value.email && registerForm.value.userName 
          && registerForm.value.firstName && registerForm.value.lastName 
          && registerForm.value.password && registerForm.value.confirmPassword
           ){

            if( registerForm.value.password === registerForm.value.confirmPassword ){
                let formData =  registerForm.value;
                this.httpClient.post(window.location.protocol + '//' + window.location.hostname + ':3000/register', registerForm.value)
                .toPromise()
                .then(
                  (res) => { 
                    console.log(formData)
                    this.authenticateUser(formData); 
                  }
                ) .catch((err) => { console.log(err); this.notificationService.addNotification(err); })

            } else { this.notificationService.addNotification('Password\'s Do Not Match'); }

      } else { this.notificationService.addNotification('Fill In All Fields'); }
  }

  editUser( editForm: NgForm ) {

  }

  loginUser(loginForm: NgForm) {
    if( loginForm.value.email && loginForm.value.password) {
      this.authenticateUser(loginForm.value);
    } else {
      this.notificationService.addNotification("Fill In All Field\'s");
    }
  }
  
  authenticateUser(loginData: NgForm) {
    console.log(loginData);
    
    this.httpClient.post(window.location.protocol + "//" + window.location.hostname + ":3000/login", loginData)
      .toPromise()
      .then(
        (res: UserInterface) => { 
          localStorage.setItem('token', res.token);
          this.getProfile();
          this.notificationService.addNotification('Login Successful');
          this.router.navigate((['/admin'])); 
        }
      )
      .catch((err) => { this.notificationService.addNotification(err); console.log(err);})
  }


  getProfile() {
    return this.httpClient.get(window.location.protocol + '//' + window.location.hostname + ':3000/profile')
    .toPromise()
    .then(
      (profile: UserInterface) => { this.setProfile(profile); console.log('here');}
    ) .catch((err) => { this.notificationService.addNotification(err); })
  }

  setProfile(profile: UserInterface) {
    this.profileSource.next(profile);
  }


  contactEmail(contactData: NgForm) {
    if( contactData.value.email && contactData.value.subject && contactData.value.body ) {
      this.httpClient.post(window.location.protocol + "//" + window.location.hostname + ":3000/contact", contactData.value )
      .toPromise()
      .then(
        (res) => { console.log('done'); }
      )
      .catch((err) => { this.notificationService.addNotification(err); }) 
    } else { this.notificationService.addNotification("Fill In All Field's") }
    
  }
}

