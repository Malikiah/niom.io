import { Component, OnInit } from '@angular/core';

import { PageService } from '../../services/page/page.service';
import { PortfolioInterface } from '../../models/page.models';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {

  portfolio: PortfolioInterface;

  constructor(
    private pageService: PageService
  ) { }

  ngOnInit() {
    new Promise ((resolve, reject) => {
      this.pageService.getPortfolio(resolve);
    })
    .then(
      (portfolio: PortfolioInterface) => {
        this.portfolio = portfolio;
      }
    )
    
  }

}
