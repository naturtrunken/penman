import { Component, OnInit } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import { HttpClient } from "@angular/common/http";
import {AppService} from "../app.service";
import {NotifyService} from "../notify.service";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  constructor(
    private translate: TranslateService,
    private http: HttpClient,
    private appService: AppService
  ) { }

  ngOnInit(): void {
    this.appService.setPageTitle('settings.title');
  }

}
