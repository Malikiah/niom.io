import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';

import { AuthService } from './auth.service';
import { UserInterface } from '../../models/index';


@Injectable({
  providedIn: 'root'
})

export class AdminGuardService implements CanActivate {
  
  constructor( 
    private authService: AuthService,
    private router: Router
     ) { }

  async canActivate() {

      let user: UserInterface = await <UserInterface>this.authService.checkJWT();
      if( user.role === 'admin') {
        return true;
      } else { return false; }

  }
}
