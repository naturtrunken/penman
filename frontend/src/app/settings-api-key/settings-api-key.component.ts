import { Component, OnInit } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {HttpClient} from "@angular/common/http";
import {AppService} from "../app.service";
import {NotifyService} from "../notify.service";
import {ApiKeyResponse} from "../models/api_key";
import {AppConst} from "../app.const";

@Component({
  selector: 'app-settings-api-key',
  templateUrl: './settings-api-key.component.html',
  styleUrls: ['./settings-api-key.component.css']
})
export class SettingsApiKeyComponent implements OnInit {

  api_key = "";
  show_changed_api_key_alert = false;

  constructor(
    private translate: TranslateService,
    private http: HttpClient,
    private appService: AppService,
    private notifyService: NotifyService
  ) { }

  ngOnInit(): void {
    this.loadApiKey();
  }

  loadApiKey(): void {
    this.http.get<ApiKeyResponse>(
      AppConst.BACKEND_API_KEY_SHOW_PATH
        .replace(":user_id", sessionStorage.getItem('uuid') || "")
    ).subscribe((resp: ApiKeyResponse) => {
      this.api_key = resp.value;
    },(error) => {
      this.translate.get("general.general_error").subscribe((val: string) => {
        this.notifyService.showError(val);
        console.error(error);
      });
    });
  }

  recreateApiKey(): void {
    this.http.post<ApiKeyResponse>(
      AppConst.BACKEND_API_KEY_CREATE_PATH
        .replace(":user_id", sessionStorage.getItem('uuid') || ""),
      {}
    ).subscribe((resp: ApiKeyResponse)=> {
      this.translate.get('settings.sections.api_key.recreated').subscribe((val: string) => {
        this.notifyService.showSuccess(val);
      });
      this.api_key = resp.value;
      this.show_changed_api_key_alert = true;
    }, error => {
      this.translate.get("general.general_error").subscribe((val: string) => {
        this.notifyService.showError(val);
        console.error(error);
      });
    });
  }

}
