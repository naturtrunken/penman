import { Component, OnInit } from '@angular/core';
import {AppConst} from "../app.const";
import {UntypedFormBuilder} from '@angular/forms';
import {TranslateService} from "@ngx-translate/core";
import {NotifyService} from "../notify.service";
import {AuthService} from "../services/auth.service";
import {AppService} from "../app.service";

@Component({
  selector: 'app-auth-register',
  templateUrl: './auth-register.component.html',
  styleUrls: ['./auth-register.component.scss']
})
export class AuthRegisterComponent implements OnInit {
  registerForm = this.formBuilder.group({
    email: '',
    password: '',
    password_confirmation: ''
  });
  isRegistered = false;


  constructor(
    private translate: TranslateService,
    private appService: AppService,
    private formBuilder: UntypedFormBuilder,
    private authService: AuthService,
    private notifyService: NotifyService
  ) {
    appService.setPageTitle('auth.register.title');
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    let email = this.registerForm.value["email"];
    let password = this.registerForm.value["password"];
    let password_confirmation = this.registerForm.value["password_confirmation"];

    if (
      (email == '') || (email.length < AppConst.AUTH_MIN_EMAIL_LENGTH) ||
      (password == '') || (password.length < AppConst.AUTH_MIN_PASSWORD_LENGTH)
    ) {
      this.translate.get("auth.login.incomplete_form").subscribe((val: string) => {
        this.notifyService.showInfo(val);
      });
    } else if (password != password_confirmation) {
      this.translate.get("auth.register.password_mismatch").subscribe((val: string) => {
        this.notifyService.showInfo(val);
      });
    } else {
      this.authService.register(email, password).subscribe(() => {
        // Show the registered dialog.
        this.isRegistered = true;
      });
    }
  }

}
