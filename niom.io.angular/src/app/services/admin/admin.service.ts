import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { NotificationService } from '../notification/notification.service';
import { UserInterface } from '../../models/index';


@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(
    private httpClient: HttpClient,
    private notificationService: NotificationService,
    private router: Router
  ) { }

  getUsers(resolve?) {
    this.httpClient.get(window.location.protocol + "//" + window.location.hostname + ":3000/admin/users")
    .toPromise()
    .then(
      (users: UserInterface) => { resolve(users); }
    ) .catch( (err) => { this.notificationService.addNotification(err) } );

  }

  getPages(resolve?) {
    this.httpClient.get(window.location.protocol + "//" + window.location.hostname + ":3000/admin/pages")
    .toPromise()
    .then(
      (pages: any) => { resolve(pages); }
    ) .catch( (err) => { this.notificationService.addNotification(err) } );

  }

  createPage(createForm: NgForm) {
    switch(createForm.value.type) {
      case 'post':
        console.log(createForm.value);
        if(createForm.value.title && createForm.value.body) {

          this.httpClient.post(window.location.protocol + '//' + window.location.hostname + ':3000/admin/create-page', createForm.value)
            .toPromise()
            .then(
              (res) => { 
                this.notificationService.addNotification('Page Created');
              }
            ) .catch((err) => { this.notificationService.addNotification(err); })

        } else { this.notificationService.addNotification('Fill In All Fields'); }

        break;
      case 'portfolio':
        
        if(createForm.value.title && createForm.value.clientId && createForm.value.clientSecret && createForm.value.email || createForm.value.title && createForm.value.siteUrl) {
          createForm.value.email = createForm.value.email.toLowerCase();
          this.httpClient.post(window.location.protocol + '//' + window.location.hostname + ':3000/admin/create-page', createForm.value)
            .toPromise()
            .then(
              () => { 
                if(createForm.value.clientId) {
                  if(confirm('Do you want to validate now?')) {
                    location.href='https://api.instagram.com/oauth/authorize/?client_id=' + createForm.value.clientId + '&redirect_uri=' 
                    + window.location.protocol + '//' + window.location.hostname + ':4200' + '&response_type=code';
                  } else {
                    console.log('send email');
                  }
                } else {
                  this.notificationService.addNotification('Page Created'); this.router.navigate((['/admin/pages']));
                }
              }
            ) .catch((err) => { this.notificationService.addNotification(err); })

        } else { this.notificationService.addNotification('Fill In All Fields'); }

        break;
    }
  }

  delete($event, collection?: any) {
    if(confirm('Do you want to delete: ' + $event.target.parentNode.childNodes[0].textContent)) {
      let data: any = {
      'criteriaValue': $event.target.parentNode.childNodes[0].textContent,
      'collection': collection
      }

      this.httpClient.post(window.location.protocol + '//' + window.location.hostname + ':3000/admin/delete', data)
      .toPromise()
      .then(
        (res) => {
          location.reload();
        }
      ) .catch((err) => { this.notificationService.addNotification(err); })
    } 

    }
    
}
