import { Component, OnInit } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {AppService} from "../app.service";
import {AppConst} from "../app.const";

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  appName = AppConst.APP_NAME;

  constructor(
    private translate: TranslateService,
    private appService: AppService
  ) {
    this.appService.setPageTitle(AppConst.APP_NAME);
  }

  ngOnInit(): void {
  }

}
