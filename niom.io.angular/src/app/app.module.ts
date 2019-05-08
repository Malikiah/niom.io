import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { 
  MainComponent,
  StackComponent,
  ContactComponent,
  AboutComponent,
  ServicesComponent,
  PortfolioComponent,
  LoginComponent,
  AdminComponent
} from './components/index';
import {
  AuthInterceptorService,
  LoadingInterceptorService
} from './services/index';
import { LoadingComponent } from './components/loading/loading.component';
import { UsersComponent } from './components/adminstration/admin/components/users/users.component';
import { PagesComponent } from './components/adminstration/admin/components/pages/pages.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    StackComponent,
    ContactComponent,
    AboutComponent,
    ServicesComponent,
    PortfolioComponent,
    LoginComponent,
    AdminComponent,
    LoadingComponent,
    UsersComponent,
    PagesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptorService,
      multi: true
    },
    { 
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
