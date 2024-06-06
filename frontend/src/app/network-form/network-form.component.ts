import { Component, OnInit } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {UntypedFormBuilder} from "@angular/forms";
import {AppService} from "../app.service";
import {AppConst} from "../app.const";
import {NotifyService} from "../notify.service";
import {ActivatedRoute, Router} from "@angular/router";
import {NetworkResponse} from "../models/network";
import {HttpClient} from "@angular/common/http";
import {HttpResponseType} from "../interfaces/http-response";
import {ConfirmationDialogService} from "../services/confirmation-dialog.service";

@Component({
  selector: 'app-network-form',
  templateUrl: './network-form.component.html',
  styleUrls: ['./network-form.component.css']
})
export class NetworkFormComponent implements OnInit {
  networkForm = this.formBuilder.group({
    name: ''
  });

  // Stores the parameters from the URL.
  urlUserId = '';
  urlNetworkId = '';

  // Stores the current page state.
  httpResponseType = HttpResponseType;
  pageStatus = HttpResponseType.Open;

  // Strings for the confirmation dialog.
  confirmationDialogTitle: string = "";
  confirmationDialogText: string = "";
  confirmationDialogOkButton: string = "";

  constructor(
    private translate: TranslateService,
    private http: HttpClient,
    private formBuilder: UntypedFormBuilder,
    private appService: AppService,
    private notifyService: NotifyService,
    private router: Router,
    private route: ActivatedRoute,
    private confirmationDialogService: ConfirmationDialogService
  ) {
    this.appService.setPageTitle('network.form.new_title');

    // Get the current page id from the url parameter.
    this.route.params.subscribe( params => {
      this.urlUserId = params["user_id"];
      this.urlNetworkId = params["id"];
      this.loadNetwork();
    } );
  }

  ngOnInit(): void {
    this.translate.get("general.confirm_destroy").subscribe((val: string) => {
      this.confirmationDialogTitle = val;
    });
    this.translate.get("network.form.destroy_confirmation_text").subscribe((val: string) => {
      this.confirmationDialogText = val;
    });
    this.translate.get("general.confirm_destroy_ok_button").subscribe((val: string) => {
      this.confirmationDialogOkButton = val;
    });
  }

  onSubmit(): void {
    let name = this.networkForm.value["name"];

    if (name == '') {
      this.translate.get("general.incomplete_form").subscribe((val: string) => {
        this.notifyService.showInfo(val);
      });
    } else {
      if ((this.urlNetworkId) && (this.urlNetworkId != '')) {
        this.updateNetwork();
      } else {
        this.createNetwork();
      }
    }
  }

  /** TODO How can I abstract this.http.post and this.http.get and this.http.delete to combine the *network methods? **/
  deleteNetwork(): void {
    this.confirmationDialogService.confirm(
      this.confirmationDialogTitle,
      this.confirmationDialogText,
      true,
      this.confirmationDialogOkButton
    ).then((confirmed) => {
      if (!confirmed) {
        return;
      }

      this.http.delete(
        AppConst.BACKEND_NETWORKS_DELETE_PATH
          .replace(":user_id", sessionStorage.getItem('uuid') || "")
          .replace(":id", this.urlNetworkId || ""),
        {}
      ).subscribe(() => {
        this.translate.get("general.deleted").subscribe((val: string) => {
          this.notifyService.showSuccess(val);
        });
        this.router.navigateByUrl('/dashboard');
      }, error => {
        this.translate.get("general.general_error").subscribe((val: string) => {
          this.notifyService.showError(val);
          console.error(error);
        });
      });

    });

  }

  createNetwork(): void {
    if (!this.validateNetworkParameter()) {
      return;
    }

    this.http.post<NetworkResponse>(
      AppConst.BACKEND_NETWORKS_CREATE_PATH
        .replace(":user_id", sessionStorage.getItem('uuid') || ""),
      this.networkParameter()
    ).subscribe(() => {
      this.translate.get("general.created").subscribe((val: string) => {
        this.notifyService.showSuccess(val);
      });
      this.router.navigateByUrl('/dashboard');
    }, error => {
      this.translate.get("general.general_error").subscribe((val: string) => {
        this.notifyService.showError(val);
        console.error(error);
      });
    });
  }

  updateNetwork(): void {
    if (!this.validateNetworkParameter()) {
      return;
    }

    this.http.put<NetworkResponse>(
      AppConst.BACKEND_NETWORKS_UPDATE_PATH
        .replace(":user_id", sessionStorage.getItem('uuid') || "")
        .replace(":id", this.urlNetworkId || ""),
      this.networkParameter()
    ).subscribe(() => {
      this.translate.get("general.updated").subscribe((val: string) => {
        this.notifyService.showSuccess(val);
      });
      this.router.navigateByUrl('/dashboard');
    }, error => {
      this.translate.get("general.general_error").subscribe((val: string) => {
        this.notifyService.showError(val);
        console.error(error);
      });
    });
  }

  // Collects the parameter for the CREATE and UPDATE requests.
  networkParameter(): Object {
    return {
      "network": {
        "name": this.networkForm.controls["name"].value
      }
    }
  }

  validateNetworkParameter(): boolean {
    if (
      (!this.networkForm.controls["name"].value) ||
      (this.networkForm.controls["name"].value == '')
    ) {
      this.translate.get("models.network.errors.name.missing").subscribe((val: string) => {
        this.notifyService.showInfo(val);
      });
      return false;
    }

    return true;
  }

  // Loads the network from the url, if available.
  loadNetwork(): void {
    this.http.get<NetworkResponse>(
      AppConst.BACKEND_NETWORKS_SHOW_PATH
        .replace(":user_id", sessionStorage.getItem('uuid') || "")
        .replace(":id", this.urlNetworkId || ""),
    ).subscribe((resp: NetworkResponse) => {
      this.pageStatus = HttpResponseType.Ok;
      this.appService.setPageTitle('network.form.edit_title');

      this.networkForm.controls["name"].setValue(resp.name);
    },(error) => {
      if (error.status == 404) {
        this.pageStatus = HttpResponseType.NotFound;
      } else {
        this.pageStatus = HttpResponseType.ServerError;
      }
    });
  }

  back(): void {
    this.router.navigateByUrl('/dashboard');
  }

}
