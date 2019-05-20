import { Component, OnInit } from '@angular/core';

import { AppComponent } from '../../../app.component';
import { LoadingService } from '../../../services/index';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  isLoading: boolean;
  constructor(
    public appComponent : AppComponent,
    private loadingService: LoadingService
  ) { }

  ngOnInit() {
    this.loadingService.newLoadingStatus.subscribe( isLoading => this.isLoading = isLoading );
  }

  sideBar() {
    
    let gridLayout = document.getElementById("grid-layout");
    console.log(gridLayout.style);
    if(gridLayout.style.gridTemplateColumns === '100px 1fr') {
      console.log('works');
      gridLayout.style.gridTemplateColumns = '0px 1fr';
    } else {

    }
  }
}
