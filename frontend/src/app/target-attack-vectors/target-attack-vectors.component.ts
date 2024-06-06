import {Component, Input, OnInit} from '@angular/core';
import {HttpResponseType} from "../interfaces/http-response";
import {HttpClient} from "@angular/common/http";
import {TranslateService} from "@ngx-translate/core";
import {NotifyService} from "../notify.service";
import {AppConst} from "../app.const";
import {AttackVectorEntry, AttackVectorResponse, AttackVectorsResponse} from "../models/attack_vector";
import {UntypedFormBuilder} from "@angular/forms";
import {ServicesResponse} from "../models/service";
import {ConfirmationDialogService} from "../services/confirmation-dialog.service";

@Component({
  selector: 'app-target-attack-vectors',
  templateUrl: './target-attack-vectors.component.html',
  styleUrls: ['./target-attack-vectors.component.css']
})
export class TargetAttackVectorsComponent implements OnInit {
  attackVectorForm = this.formBuilder.group({
    text: '',
    serviceId: ''
  });

  // The current attack vector
  attackVectors: AttackVectorsResponse = {
    attack_vectors: []
  }

  // The services for the select box.
  services: ServicesResponse = {
    services: []
  }
  selectedService: string = "";

  // Stores the current page state.
  httpResponseType = HttpResponseType;
  pageStatus = HttpResponseType.Open;

  // Stores the parameters from the URL.
  @Input() userId = '';
  @Input() networkId = '';
  @Input() targetId = '';

  // Strings for the confirmation dialog.
  confirmationDialogTitle: string = "";
  confirmationDialogText: string = "";
  confirmationDialogOkButton: string = "";

  constructor(
    private http: HttpClient,
    private formBuilder: UntypedFormBuilder,
    private translate: TranslateService,
    private notifyService: NotifyService,
    private confirmationDialogService: ConfirmationDialogService
  ) {
  }

  ngOnInit(): void {
    this.loadServices();
    this.loadAttackVectors();

    this.translate.get("general.confirm_destroy").subscribe((val: string) => {
      this.confirmationDialogTitle = val;
    });
    this.translate.get("target.attack_vectors.destroy_confirmation_text").subscribe((val: string) => {
      this.confirmationDialogText = val;
    });
    this.translate.get("general.confirm_destroy_ok_button").subscribe((val: string) => {
      this.confirmationDialogOkButton = val;
    });
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

  loadAttackVectors(): void {
    this.http.get<AttackVectorsResponse>(
      AppConst.BACKEND_ATTACK_VECTORS_INDEX_PATH
        .replace(":user_id", this.userId || "")
        .replace(":network_id", this.networkId || "")
        .replace(":target_id", this.targetId || "")
    ).subscribe((resp: AttackVectorsResponse) => {
      this.pageStatus = HttpResponseType.Ok;
      this.attackVectors = resp;
    },(error) => {
      if (error.status == 404) {
        this.pageStatus = HttpResponseType.NotFound;
      } else {
        this.pageStatus = HttpResponseType.ServerError;
      }
    });
  }

  deleteAttackVector(attackVectorResponse: AttackVectorResponse): void {
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
        AppConst.BACKEND_ATTACK_VECTORS_DELETE_PATH
          .replace(":user_id", this.userId|| "")
          .replace(":network_id", this.networkId || "")
          .replace(":target_id", this.targetId || "")
          .replace(":id", attackVectorResponse.attack_vector.id || "")
      ).subscribe(() => {
        this.translate.get("general.deleted").subscribe((val: string) => {
          this.notifyService.showSuccess(val);
        });
        let attackVectorElement = document.getElementById('attack-vector-row-' + attackVectorResponse.attack_vector.id)
        if (attackVectorElement) {
          attackVectorElement.remove();
        }
      }, error => {
        this.translate.get("general.general_error").subscribe((val: string) => {
          this.notifyService.showError(val);
          console.error(error);
        });
      });

    });

  }

  onSubmit(): void {
    let text = this.attackVectorForm.value["text"];
    let serviceId = this.attackVectorForm.value["serviceId"];

    if (text == '') {
      this.translate.get("general.incomplete_form").subscribe((val: string) => {
        this.notifyService.showInfo(val);
      });
    } else {
      this.createAttackVector(text, serviceId);
    }
  }

  createAttackVector(text: string, serviceId: string): void {
    this.http.post<AttackVectorEntry>(
      AppConst.BACKEND_ATTACK_VECTORS_CREATE_PATH
        .replace(":user_id", this.userId|| "")
        .replace(":network_id", this.networkId || "")
        .replace(":target_id", this.targetId || ""),
      {
        "attack_vector": {
          "text": text,
          "service_id": serviceId
        }
      }
    ).subscribe(() => {
      this.translate.get("general.created").subscribe((val: string) => {
        this.notifyService.showSuccess(val);
      });
      this.attackVectorForm.controls["text"].setValue("");
      this.loadAttackVectors();
    }, error => {
      this.translate.get("general.general_error").subscribe((val: string) => {
        this.notifyService.showError(val);
        console.error(error);
      });
    });
  }

  toggleTried(attackVectorResponse: AttackVectorResponse): void {
    this.http.put(
      AppConst.BACKEND_ATTACK_VECTORS_UPDATE_PATH
        .replace(":user_id", this.userId|| "")
        .replace(":network_id", this.networkId || "")
        .replace(":target_id", this.targetId || "")
        .replace(":id", attackVectorResponse.attack_vector.id || ""),
      {
        "attack_vector": {
          "tried": (!attackVectorResponse.attack_vector.tried).toString()
        }
      }
    ).subscribe(() => {
      this.translate.get("general.updated").subscribe((val: string) => {
        this.notifyService.showSuccess(val);
      });
      this.loadAttackVectors();
    }, error => {
      this.translate.get("general.general_error").subscribe((val: string) => {
        this.notifyService.showError(val);
        console.error(error);
      });
    });
  }

}
