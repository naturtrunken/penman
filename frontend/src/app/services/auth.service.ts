import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {AppConst} from "../app.const";
import {AuthDataLoginResponse} from "./auth.interfaces";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUsername = new BehaviorSubject('');

  constructor(
    private http: HttpClient
  ) {
    let session = this.getSession();
    this.setCurrentUsername(session["uid"]);
  }

  public login(email: string, password: string): void {
    this.http.post<AuthDataLoginResponse>(
      AppConst.BACKEND_AUTH_LOGIN_PATH,
      {
        "email": email,
        "password": password
      }
    ).subscribe((resp: AuthDataLoginResponse) => {
      // The cookies are set via the headers. Here we get an object via the body.
      sessionStorage.setItem('uuid', resp.data.id);
      sessionStorage.setItem('next-message', "success|auth.service.login.success");
      window.location.href = '/dashboard';
    });
  }

  public register(email: string, password: string): Observable<HttpResponse<any>> {
    return this.http.post(
      AppConst.BACKEND_AUTH_REGISTER_PATH,
      {
        "email": email,
        "password": password,
        "password_confirmation": password,
        "confirm_success_url": 'http://localhost:4200/'
      },
      {
        observe: 'response' // Returns the full response without parsing.
      }
    )
  }

  public logout(): void {
    this.http.delete(
      AppConst.BACKEND_AUTH_LOGOUT_PATH,
      {
        observe: 'response',
        headers: new HttpHeaders(this.getSession())
      }
    ).subscribe(() => {
      sessionStorage.removeItem('access-token');
      sessionStorage.removeItem('client');
      sessionStorage.removeItem('expiry');
      sessionStorage.removeItem('uid');
      sessionStorage.removeItem('uuid');

      sessionStorage.setItem('next-message', "success|auth.service.logout.success");

      this.setCurrentUsername('');
      window.location.href = '/login';
    });
  }

  public getSession() {
    return {
      'access-token': sessionStorage.getItem('access-token') || "",
      'client': sessionStorage.getItem('client') || "",
      'expiry': sessionStorage.getItem('expiry') || "",
      'uid': sessionStorage.getItem('uid') || "",
      'uuid': sessionStorage.getItem('uuid') || ""
    }
  }

  private setCurrentUsername(headerUserString: string) {
    this.currentUsername.next(headerUserString);
  }

  // Is true, if a user is currently logged in.
  public isLoggedIn(): boolean {
    return !!sessionStorage.getItem('access-token');
  }

}

