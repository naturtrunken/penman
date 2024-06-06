import {Component, OnInit} from '@angular/core';
import {HttpResponseType} from "../interfaces/http-response";
import {TranslateService} from "@ngx-translate/core";
import {HttpClient} from "@angular/common/http";
import {UntypedFormBuilder} from "@angular/forms";
import {AppService} from "../app.service";
import {NotifyService} from "../notify.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AppConst} from "../app.const";
import {TargetResponse} from "../models/target";
import {ConfirmationDialogService} from "../services/confirmation-dialog.service";

@Component({
  selector: 'app-target-form',
  templateUrl: './target-form.component.html',
  styleUrls: ['./target-form.component.css']
})
export class TargetFormComponent implements OnInit {
  targetForm = this.formBuilder.group({
    name: '',
    ip: ''
  });

  // Stores the parameters from the URL.
  urlUserId = '';
  urlNetworkId = '';
  urlTargetId = '';

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
    this.appService.setPageTitle('target.form.new_title');

    // Get the current page id from the url parameter.
    this.route.params.subscribe(params => {
      this.urlUserId = params["user_id"];
      this.urlNetworkId = params["network_id"];
      this.urlTargetId = params["id"];
      this.loadTarget();
    });
  }

  ngOnInit(): void {
    this.translate.get("general.confirm_destroy").subscribe((val: string) => {
      this.confirmationDialogTitle = val;
    });
    this.translate.get("target.form.destroy_confirmation_text").subscribe((val: string) => {
      this.confirmationDialogText = val;
    });
    this.translate.get("general.confirm_destroy_ok_button").subscribe((val: string) => {
      this.confirmationDialogOkButton = val;
    });
  }

  onSubmit(): void {
    let name = this.targetForm.value["name"];

    if (name == '') {
      this.translate.get("general.incomplete_form").subscribe((val: string) => {
        this.notifyService.showInfo(val);
      });
    } else {
      if ((this.urlTargetId) && (this.urlTargetId != '')) {
        this.updateTarget();
      } else {
        this.createTarget();
      }
    }
  }

  /** TODO How can I abstract this.http.post and this.http.get and this.http.delete to combine the *network methods? **/
  deleteTarget(): void {
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
        AppConst.BACKEND_TARGETS_DELETE_PATH
          .replace(":user_id", sessionStorage.getItem('uuid') || "")
          .replace(":network_id", this.urlNetworkId || "")
          .replace(":id", this.urlTargetId || ""),
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

  createTarget(): void {
    if (!this.validateTargetParameter()) {
      return;
    }

    this.http.post<TargetResponse>(
      AppConst.BACKEND_TARGETS_CREATE_PATH
        .replace(":user_id", sessionStorage.getItem('uuid') || "")
        .replace(":network_id", this.urlNetworkId || ""),
      this.targetParameter()
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

  updateTarget(): void {
    if (!this.validateTargetParameter()) {
      return;
    }

    this.http.put<TargetResponse>(
      AppConst.BACKEND_TARGETS_UPDATE_PATH
        .replace(":user_id", sessionStorage.getItem('uuid') || "")
        .replace(":network_id", this.urlNetworkId || "")
        .replace(":id", this.urlTargetId || ""),
      this.targetParameter()
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
  targetParameter(): Object {
    return {
      "target": {
        "name": this.targetForm.controls["name"].value,
        "ip": this.targetForm.controls["ip"].value
      }
    }
  }

  validateTargetParameter(): boolean {
    if (
      (!this.targetForm.controls["name"].value) ||
      (this.targetForm.controls["name"].value == '')
    ) {
      this.translate.get("models.target.errors.name.missing").subscribe((val: string) => {
        this.notifyService.showInfo(val);
      });
      return false;
    }

    return true;
  }

  // Loads the network from the url, if available.
  loadTarget(): void {
    this.http.get<TargetResponse>(
      AppConst.BACKEND_TARGETS_SHOW_PATH
        .replace(":user_id", sessionStorage.getItem('uuid') || "")
        .replace(":network_id", this.urlNetworkId || "")
        .replace(":id", this.urlTargetId || ""),
    ).subscribe((resp: TargetResponse) => {
      this.pageStatus = HttpResponseType.Ok;
      this.appService.setPageTitle('target.form.edit_title');
      this.targetForm.controls["name"].setValue(resp.name);
      this.targetForm.controls["ip"].setValue(resp.ip);
    }, (error) => {
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
