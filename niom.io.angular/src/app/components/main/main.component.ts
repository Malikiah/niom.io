import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log(document.querySelector("app-stack").clientHeight);
  }
  
  moveTo($event) {

    if(!$event.target.textContent) {
      document.getElementById('stack-section').scrollIntoView()
    } else {
      document.getElementById($event.target.textContent.toLowerCase() + '-section').scrollIntoView({behavior: "smooth"});
    }
  }
}
