import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.css']
})
export class CreatePageComponent implements OnInit {
  pageType = "post";
  constructor() { }

  ngOnInit() {
    let pageType = document.getElementById('pageType');
    pageType.addEventListener("change", () => {
      console.log((pageType as HTMLSelectElement).value)
      this.pageType = (pageType as HTMLSelectElement).value;
     });
  }

}
