import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { 
  MainComponent,
  LoginComponent,
  AdminComponent,
  UsersComponent,
  PagesComponent,
} from './components/index';

import {
  UserGuardService,
  AdminGuardService,
} from './services/index';

const routes: Routes = [
  { path:'', component: MainComponent },
  { path:'login', component: LoginComponent },
  { path:'admin', component: AdminComponent, 
    canActivate: [ 
    AdminGuardService,
  ],
    children: [
      { path: 'users', component: UsersComponent  },
      { path: 'pages', component: PagesComponent  }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
