import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LoggedInService {
  isLoggedin;

  private loggedinSource = new BehaviorSubject<boolean>(this.isLoggedin);
  newLogin = this.loggedinSource.asObservable();

  constructor() { }


  loggedinStatus( isLoggedin: boolean ) {
    this.loggedinSource.next(isLoggedin);
  }

}
