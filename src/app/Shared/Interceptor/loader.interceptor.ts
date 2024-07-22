import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpResponse
} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {LoaderService} from '../Services/loader.service';
import {finalize, tap} from 'rxjs/operators';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  private activeRequests = new BehaviorSubject<number>(0);

  constructor(private spinnerService: LoaderService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.spinnerService.show();

    return next.handle(request).pipe(
      finalize(() => {
        this.spinnerService.hide();
      })
    );

  }
}
    /*    this.activeRequests.next(this.activeRequests.value + 1);
        this.spinnerService.show();
        return next.handle(request).pipe(
          tap(
            () => {},
            () => {},
            () => {
              this.activeRequests.next(this.activeRequests.value - 1);
              if (this.activeRequests.value === 0) {
                this.spinnerService.hide();
              }
            }
          )
        );*/

