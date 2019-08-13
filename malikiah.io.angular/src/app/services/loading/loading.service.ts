import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  private isLoading: boolean = false;
  
  private loadingSource = new BehaviorSubject<boolean>(this.isLoading);
  newLoadingStatus = this.loadingSource.asObservable();

  constructor() { }

  loadingStatus(isLoading: boolean) {
    this.loadingSource.next(isLoading);
  }
}
