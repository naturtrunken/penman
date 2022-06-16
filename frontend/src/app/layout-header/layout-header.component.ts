import { Component, OnInit } from '@angular/core';
import {AppConst} from "../app.const";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-layout-header',
  templateUrl: './layout-header.component.html',
  styleUrls: ['./layout-header.component.css']
})
export class LayoutHeaderComponent implements OnInit {

  APP_NAME = AppConst.APP_NAME;
  currentUsername = '';
  isLoggedIn = false;

  constructor(
    private authService: AuthService,
  ) {
    // Update the username when the AuthService changes it.
    this.authService.currentUsername.subscribe((val: string) => {
      this.currentUsername = val;
    });

    this.isLoggedIn = this.authService.isLoggedIn()
  }

  ngOnInit(): void {
  }

  logout() {
    this.authService.logout();
  }

}
