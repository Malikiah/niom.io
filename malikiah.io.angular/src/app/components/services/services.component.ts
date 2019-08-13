import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  openServices($event) {
    console.log($event.target.nextSibling);
    $event.target.nextSibling.classList.toggle("open");
    $event.target.children[0].classList.toggle("rotate");
  }

}
