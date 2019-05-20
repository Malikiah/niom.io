import { Component, OnInit } from '@angular/core';

import { AdminService } from '../../../../../../services/index';


@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.css']
})
export class CreatePageComponent implements OnInit {
  pageType;
  constructor(
    public adminService: AdminService
  ) { }

  ngOnInit() {
    let pageType = document.getElementById('pageType');
    pageType.addEventListener("change", () => {
      this.pageType = (pageType as HTMLSelectElement).value;
     });
  }

}
