import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { NotificationService } from '../notification/notification.service';
import { PortfolioInterface } from '../../models/index';

@Injectable({
  providedIn: 'root'
})
export class PageService {

  constructor(
    private httpClient: HttpClient,
    public notificationService: NotificationService
  ) { }

  getPosts() {

  }

  getPortfolio(resolve) {
    this.httpClient.get(window.location.protocol + '//' + window.location.hostname + ':3000/portfolio')
    .toPromise()
    .then(
      (portfolio: PortfolioInterface) => { console.log(portfolio); resolve(portfolio)}
    ) .catch((err) => {  })
  }
}
