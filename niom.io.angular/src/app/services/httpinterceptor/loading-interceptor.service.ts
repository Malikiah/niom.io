import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { LoadingService } from '../loading/loading.service';

@Injectable({
  providedIn: 'root'
})
export class LoadingInterceptorService implements HttpInterceptor {
  activeRequests: number = 0;
  constructor(
    private loadingService: LoadingService,
  ) { }

  intercept( request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let isLoading = true;
    console.log(request);
    if(isLoading) {
      if(this.activeRequests === 0) {
        this.loadingService.loadingStatus(true);
      }
    }
    this.activeRequests++;
    return next.handle(request).pipe(
      finalize(() => {
        this.activeRequests--;
        if(this.activeRequests === 0) {
          this.loadingService.loadingStatus(false);
        }
      })
    );
  }
  
}
