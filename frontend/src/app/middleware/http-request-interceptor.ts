import {Injectable} from '@angular/core';
import { HttpEvent, HttpRequest, HttpHandler, HttpInterceptor, HttpResponse } from '@angular/common/http';
import {Observable} from 'rxjs';
import {map, retry} from 'rxjs/operators';
import {AppConst} from "../app.const";
import {AppVarsService} from "../app-vars.service";

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {

  constructor(
    private appVarsService: AppVarsService
  ) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // Add a language header in any case.
    request = request.clone({
      headers: request.headers.set('Locale', this.appVarsService.currentLanguage)
    });

    // Add auth tokens to the request, if a user is logged in.
    // Note: We read the values directly from the session storage here and not from the
    // AuthService because injecting this service here would result in circular dependencies.
    if ((sessionStorage.getItem('access-token')) && (sessionStorage.getItem('access-token') != '')) {
      request = request.clone({
        headers: request.headers.set('access-token', sessionStorage.getItem('access-token') || '')
          .set('client', sessionStorage.getItem('client') || '')
          .set('expiry', sessionStorage.getItem('expiry') || '')
          .set('uid', sessionStorage.getItem('uid') || '')
          // devise-token-auth doesn't need the uuid.
          //.set('uuid', sessionStorage.getItem('uuid') || '')
      });
    }


    // Return the request, unchanged or not, set the global retry count and update the tokens, if available.
    return next.handle(request).pipe(
      retry(AppConst.SETTING_HTTP_RETRY_COUNT),
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          if ((event.headers.get('access-token')) && (event.headers.get('access-token') != '')) {
            sessionStorage.setItem('access-token', event.headers.get('access-token') || '');
            sessionStorage.setItem('client', event.headers.get('client') || '');
            sessionStorage.setItem('expiry', event.headers.get('expiry') || '');
            sessionStorage.setItem('uid', event.headers.get('uid') || '');
          }

          if (sessionStorage.getItem('uid') != '') {
            this.appVarsService.currentUser.id = sessionStorage.getItem('uuid') || '';
            this.appVarsService.currentUser.email = sessionStorage.getItem('uid') || '';
          }
        }

        return event;
      })
    );

  }
}
