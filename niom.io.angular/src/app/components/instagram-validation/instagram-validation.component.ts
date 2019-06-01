import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-instagram-validation',
  templateUrl: './instagram-validation.component.html',
  styleUrls: ['./instagram-validation.component.css']
})
export class InstagramValidationComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    if(localStorage.getItem('token')) {
      this.router.navigate((['login']));
    }
  }

}
