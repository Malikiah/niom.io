import { Injectable, Inject } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {
  
  grecaptcha: any = document.querySelector('grecaptcha');
  ReCaptchaToken = '';
  constructor(
    ) {
      
    }

  intercept( request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log(this.grecaptcha);
    const token = localStorage.getItem('token');
        if (token) {
            const cloned = request.clone({
                
                headers: new HttpHeaders({"Authorization": token, "ReCaptcha": this.ReCaptchaToken}),
            });
            console.log(token);
            return next.handle(cloned);
        }
        else {
            return next.handle(request);
        }
          }

  setReCaptchaToken( token: String ) {
    this.grecaptcha.ready(() => {
      this.grecaptcha
        .execute('6LfDuqAUAAAAABI-d29h2lilpce801Tpx8mIq7yY', {
          action: 'execute'
        })
        .then((reCaptchaToken: string) => { this.ReCaptchaToken = reCaptchaToken; });
    });
  }
}
