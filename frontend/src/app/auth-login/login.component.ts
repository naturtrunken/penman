import {Component, OnInit} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {AppService} from "../app.service";
import {AppConst} from "../app.const";
import {UntypedFormBuilder} from '@angular/forms';
import {AuthService} from "../services/auth.service";
import {NotifyService} from "../notify.service";

@Component({
  selector: 'app-auth-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class AuthLoginComponent implements OnInit {
  loginForm = this.formBuilder.group({
    email: '',
    password: ''
  });

  constructor(
    private translate: TranslateService,
    private appService: AppService,
    private formBuilder: UntypedFormBuilder,
    private authService: AuthService,
    private notifyService: NotifyService
  ) {
    appService.setPageTitle('auth.login.title');
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    let email = this.loginForm.value["email"];
    let password = this.loginForm.value["password"];

    if (
      (email == '') || (email.length < 3) ||
      (password == '') || (password.length < AppConst.AUTH_MIN_PASSWORD_LENGTH)
    ) {
      this.translate.get("auth.login.incomplete_form").subscribe((val: string) => {
        this.notifyService.showInfo(val);
      });
    } else {
      this.authService.login(email, password);
    }

  }

}
