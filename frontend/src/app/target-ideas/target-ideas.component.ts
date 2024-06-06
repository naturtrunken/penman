import {Component, Input, OnInit} from '@angular/core';
import {ServicesResponse} from "../models/service";
import {HttpResponseType} from "../interfaces/http-response";
import { HttpClient } from "@angular/common/http";
import {UntypedFormBuilder} from "@angular/forms";
import {TranslateService} from "@ngx-translate/core";
import {NotifyService} from "../notify.service";
import {AppConst} from "../app.const";
import {IdeaEntry, IdeaResponse, IdeasResponse} from "../models/idea";
import {ConfirmationDialogService} from "../services/confirmation-dialog.service";


@Component({
  selector: 'app-target-ideas',
  templateUrl: './target-ideas.component.html',
  styleUrls: ['./target-ideas.component.css']
})
export class TargetIdeasComponent implements OnInit {
  ideaForm = this.formBuilder.group({
    text: '',
    serviceId: ''
  });

  // The current attack vector
  ideas: IdeasResponse = {
    ideas: []
  }

  // The services for the select box.
  services: ServicesResponse = {
    services: []
  }

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
  ) { }

  ngOnInit(): void {
    this.loadServices();
    this.loadIdeas();

    this.translate.get("general.confirm_destroy").subscribe((val: string) => {
      this.confirmationDialogTitle = val;
    });
    this.translate.get("idea.destroy_confirmation_text").subscribe((val: string) => {
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

  loadIdeas(): void {
    this.http.get<IdeasResponse>(
      AppConst.BACKEND_IDEAS_INDEX_PATH
        .replace(":user_id", this.userId || "")
        .replace(":network_id", this.networkId || "")
        .replace(":target_id", this.targetId || "")
    ).subscribe((resp: IdeasResponse) => {
      this.pageStatus = HttpResponseType.Ok;
      this.ideas = resp;
    },(error) => {
      if (error.status == 404) {
        this.pageStatus = HttpResponseType.NotFound;
      } else {
        this.pageStatus = HttpResponseType.ServerError;
      }
    });
  }

  deleteIdea(ideaResponse: IdeaResponse): void {
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
        AppConst.BACKEND_IDEAS_DELETE_PATH
          .replace(":user_id", this.userId|| "")
          .replace(":network_id", this.networkId || "")
          .replace(":target_id", this.targetId || "")
          .replace(":id", ideaResponse.idea.id || "")
      ).subscribe(() => {
        this.translate.get("general.deleted").subscribe((val: string) => {
          this.notifyService.showSuccess(val);
        });
        let ideaElement = document.getElementById('idea-row-' + ideaResponse.idea.id)
        if (ideaElement) {
          ideaElement.remove();
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
    let text = this.ideaForm.value["text"];
    let serviceId = this.ideaForm.value["serviceId"];

    if (text == '') {
      this.translate.get("general.incomplete_form").subscribe((val: string) => {
        this.notifyService.showInfo(val);
      });
    } else {
      this.createIdea(text, serviceId);
    }
  }

  createIdea(text: string, serviceId: string): void {
    this.http.post<IdeaEntry>(
      AppConst.BACKEND_IDEAS_CREATE_PATH
        .replace(":user_id", this.userId|| "")
        .replace(":network_id", this.networkId || "")
        .replace(":target_id", this.targetId || ""),
      {
        "idea": {
          "text": text,
          "service_id": serviceId
        }
      }
    ).subscribe(() => {
      this.translate.get("general.created").subscribe((val: string) => {
        this.notifyService.showSuccess(val);
      });
      this.ideaForm.controls["text"].setValue("");
      this.loadIdeas();
    }, error => {
      this.translate.get("general.general_error").subscribe((val: string) => {
        this.notifyService.showError(val);
        console.error(error);
      });
    });
  }

  toggleTried(ideaResponse: IdeaResponse): void {
    this.http.put(
      AppConst.BACKEND_IDEAS_UPDATE_PATH
        .replace(":user_id", this.userId|| "")
        .replace(":network_id", this.networkId || "")
        .replace(":target_id", this.targetId || "")
        .replace(":id", ideaResponse.idea.id || ""),
      {
        "idea": {
          "tried": (!ideaResponse.idea.tried).toString()
        }
      }
    ).subscribe(() => {
      this.translate.get("general.updated").subscribe((val: string) => {
        this.notifyService.showSuccess(val);
      });
      this.loadIdeas();
    }, error => {
      this.translate.get("general.general_error").subscribe((val: string) => {
        this.notifyService.showError(val);
        console.error(error);
      });
    });
  }

}
