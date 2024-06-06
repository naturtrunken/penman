import {Component, Input, OnInit} from '@angular/core';
import {ServicesResponse} from "../models/service";
import {AppConst} from "../app.const";
import { HttpClient } from "@angular/common/http";
import {TranslateService} from "@ngx-translate/core";
import {NotifyService} from "../notify.service";

@Component({
  selector: 'app-target-blocks-services',
  templateUrl: './target-blocks-services.component.html',
  styleUrls: ['./target-blocks-services.component.css']
})
export class TargetBlocksServicesComponent implements OnInit {

  // The active service.
  currentService = "general";

  // The services.
  services: ServicesResponse = {
    services: []
  };

  // Input phase
  @Input() phase: string = '';

  // Stores the parameters from the URL.
  @Input() userId = '';
  @Input() networkId = '';
  @Input() targetId = '';

  constructor(
    private http: HttpClient,
    private translate: TranslateService,
    private notifyService: NotifyService
  ) { }

  ngOnInit(): void {
    this.loadServices();
  }

  loadServices(): void {
    this.http.get<ServicesResponse>(
      AppConst.BACKEND_SERVICES_INDEX_PATH
        .replace(":user_id", this.userId || "")
        .replace(":network_id", this.networkId || "")
        .replace(":target_id", this.targetId || ""),
    ).subscribe((resp: ServicesResponse) => {
      this.services = resp;
    },(error) => {
      this.translate.get("general.general_error").subscribe((val: string) => {
        this.notifyService.showError(val);
        console.error(error);
      });
    });
  }

}
