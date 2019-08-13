import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../../../services/index';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    public userService: UserService,
    private router: Router,
  ) { }

  ngOnInit() {
    console.log(localStorage.getItem('token'));
    if(localStorage.getItem('token')) {
      this.router.navigate((['/admin']));

    }
  }

}
