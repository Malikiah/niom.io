import { Component, OnInit } from '@angular/core';

import { PageService } from '../../services/page/page.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {

  constructor(
    private pageService: PageService
  ) { }

  ngOnInit() {
    this.pageService.getPortfolio();
  }

}
