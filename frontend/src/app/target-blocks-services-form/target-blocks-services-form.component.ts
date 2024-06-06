import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AppConst} from "../app.const";
import {HttpResponseType} from "../interfaces/http-response";
import {ServiceResponse, ServicesResponse} from "../models/service";
import {HttpClient} from "@angular/common/http";
import {TranslateService} from "@ngx-translate/core";
import {NotifyService} from "../notify.service";
import {UntypedFormBuilder} from "@angular/forms";

@Component({
  selector: 'app-target-blocks-services-form',
  templateUrl: './target-blocks-services-form.component.html',
  styleUrls: ['./target-blocks-services-form.component.css']
})
export class TargetBlocksServicesFormComponent implements OnInit {
  serviceForm = this.formBuilder.group({
    name: '',
    protocol: 'tcp',
    port: 0
  });

  protocols = [
    'tcp',
    'udp'
  ];

  // The current service
  services: ServicesResponse = {
    services: []
  }

  // Receives the parent function for refreshing the blocks.
  @Output("loadParentServices") loadParentServices: EventEmitter<any> = new EventEmitter<any>();

  // Stores the parameters from the URL.
  @Input() userId = '';
  @Input() networkId = '';
  @Input() targetId = '';

  // Stores the current page state.
  httpResponseType = HttpResponseType;
  pageStatus = HttpResponseType.Open;

  constructor(
    private http: HttpClient,
    private formBuilder: UntypedFormBuilder,
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
      this.pageStatus = HttpResponseType.Ok;
      this.services = resp;
    },(error) => {
      if (error.status == 404) {
        this.pageStatus = HttpResponseType.NotFound;
      } else {
        this.pageStatus = HttpResponseType.ServerError;
      }
    });
  }

  deleteService(service: ServiceResponse): void {
    this.http.delete(
      AppConst.BACKEND_SERVICES_DELETE_PATH
        .replace(":user_id", this.userId|| "")
        .replace(":network_id", this.networkId || "")
        .replace(":target_id", this.targetId || "")
        .replace(":id", service.id || ""),
    ).subscribe(() => {
      this.translate.get("general.deleted").subscribe((val: string) => {
        this.notifyService.showSuccess(val);
      });
      let serviceElement = document.getElementById('service-row-' + service.id)
      if (serviceElement) {
        serviceElement.remove();
      }
      // Trigger the function from the parent to reload the services.
      this.loadParentServices.emit();
    }, error => {
      this.translate.get("general.general_error").subscribe((val: string) => {
        this.notifyService.showError(val);
        console.error(error);
      });
    });
  }

  onSubmit(): void {
    let name = this.serviceForm.value["name"];
    let protocol = this.serviceForm.value["protocol"];
    let port = this.serviceForm.value["port"];

    if (
      (name == '') ||
      (protocol == '') ||
      (port == '')
    ) {
      this.translate.get("general.incomplete_form").subscribe((val: string) => {
        this.notifyService.showInfo(val);
      });
    } else {
        this.createService(protocol, port, name);
    }
  }

  createService(protocol: string, port: number, name: string): void {
    this.http.post<ServiceResponse>(
      AppConst.BACKEND_SERVICES_CREATE_PATH
        .replace(":user_id", this.userId|| "")
        .replace(":network_id", this.networkId || "")
        .replace(":target_id", this.targetId || ""),
      {
        "service": {
          "name": name,
          "protocol": protocol,
          "port": port.toString()
        }
      }
    ).subscribe(() => {
      this.translate.get("general.created").subscribe((val: string) => {
        this.notifyService.showSuccess(val);
      });
      this.serviceForm.controls["name"].setValue("");
      this.serviceForm.controls["protocol"].setValue("");
      this.serviceForm.controls["port"].setValue("");
      // Load this services.
      this.loadServices();
      // Trigger the function from the parent to reload the services.
      this.loadParentServices.emit();
    }, error => {
      this.translate.get("general.general_error").subscribe((val: string) => {
        this.notifyService.showError(val);
        console.error(error);
      });
    });
  }

}
