import {Component, Input, OnInit} from '@angular/core';
import {BlockChecklistElement, BlockResponse} from "../models/block";
import {AppConst} from "../app.const";
import {HttpClient} from "@angular/common/http";
import {TranslateService} from "@ngx-translate/core";
import {NotifyService} from "../notify.service";
import {Gallery, GalleryItem, ImageItem} from "ng-gallery";
import {Lightbox} from "ng-gallery/lightbox";
import {AppEnvVariables} from "../../environments/environment.vars";
import {ConfirmationDialogService} from "../services/confirmation-dialog.service";

@Component({
  selector: 'app-target-block-standard',
  templateUrl: './target-block-standard.component.html',
  styleUrls: ['./target-block-standard.component.css']
})
export class TargetBlockStandardComponent implements OnInit {

  // Backend URL for displaying the images.
  BACKEND_URL: string = AppEnvVariables.BACKEND_URL;
  FILE_UPLOAD_PREVIEW_HEIGHT_PX: number = AppConst.FILE_UPLOAD_PREVIEW_HEIGHT_PX;

  @Input() block: BlockResponse = {
    id: "",
    user_network_target_id: "",
    text: "",
    output: "",
    created_at: "",
    updated_at: "",
    flag: "",
    phase: "",
    block_files: [],
    block_images: [],
    block_checklist_elements: []
  };

  // Stores the parameters from the URL.
  @Input() userId = '';
  @Input() networkId = '';
  @Input() targetId = '';

  // Gallery items.
  galleryItems: GalleryItem[] = [];

  // Strings for the confirmation dialog.
  confirmationDialogTitle: string = "";
  confirmationDialogText: string = "";
  confirmationDialogOkButton: string = "";

  constructor(
    private http: HttpClient,
    private translate: TranslateService,
    private notifyService: NotifyService,
    public gallery: Gallery,
    public lightbox: Lightbox,
    private confirmationDialogService: ConfirmationDialogService
  ) {
  }

  ngOnInit(): void {
    this.loadLightboxImages();

    this.translate.get("general.confirm_destroy").subscribe((val: string) => {
      this.confirmationDialogTitle = val;
    });
    this.translate.get("target.block.standard.destroy_confirmation_text").subscribe((val: string) => {
      this.confirmationDialogText = val;
    });
    this.translate.get("general.confirm_destroy_ok_button").subscribe((val: string) => {
      this.confirmationDialogOkButton = val;
    });
  }


  deleteBlock(block: BlockResponse): void {

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
        AppConst.BACKEND_BLOCKS_DELETE_PATH
          .replace(":user_id", this.userId || "")
          .replace(":network_id", this.networkId || "")
          .replace(":target_id", this.targetId || "")
          .replace(":id", block.id || ""),
      ).subscribe(() => {
        this.translate.get("general.deleted").subscribe((val: string) => {
          this.notifyService.showSuccess(val);
        });
        let blockElement = document.getElementById('block-' + block.id)
        if (blockElement) {
          blockElement.remove();
        }
      }, error => {
        this.translate.get("general.general_error").subscribe((val: string) => {
          this.notifyService.showError(val);
          console.error(error);
        });
      });

    });

  }

  updateBlock(block: BlockResponse, flag: string): void {
    // Determine if the block already has the same flag.
    // If yes, the flag should be removed.
    let blockElement = document.getElementById('block-' + block.id);
    let removeFlag = ((blockElement) && (blockElement.classList.contains("block-" + flag)));

    this.http.put<BlockResponse>(
      AppConst.BACKEND_BLOCKS_UPDATE_PATH
        .replace(":user_id", this.userId || "")
        .replace(":network_id", this.networkId || "")
        .replace(":target_id", this.targetId || "")
        .replace(":id", block.id || ""),
      {
        "flag": removeFlag ? 'no_flag' : flag
      }
    ).subscribe(() => {
      this.translate.get("general.updated").subscribe((val: string) => {
        this.notifyService.showSuccess(val);
      });

      // Set the flag directly.
      if (blockElement) {
        blockElement.classList.remove("block-info");
        blockElement.classList.remove("block-user");
        blockElement.classList.remove("block-root");

        if (!removeFlag) {
          blockElement.classList.add("block-" + flag);
        }
      }
    }, error => {
      this.translate.get("general.general_error").subscribe((val: string) => {
        this.notifyService.showError(val);
        console.error(error);
      });
    });
  }

  loadLightboxImages(): void {
    this.galleryItems = this.block.block_images.map(block_file => {
      return new ImageItem({
        src: AppEnvVariables.BACKEND_URL + block_file.original_path,
        thumb: AppEnvVariables.BACKEND_URL + block_file.preview_path
      });
    });
    this.gallery.ref('lightbox').load(this.galleryItems);
  }


  toggleCheckbox(checklistElement: BlockChecklistElement) {
    let currentCheckbox = document.querySelector('#block-checkbox-' + checklistElement.id) as HTMLInputElement;
    if (!currentCheckbox) {
      return;
    }

    this.http.put<BlockChecklistElement>(
      AppConst.BACKEND_CHECKLIST_ELEMENTS_UPDATE_PATH
        .replace(":user_id", this.userId || "")
        .replace(":network_id", this.networkId || "")
        .replace(":target_id", this.targetId || "")
        .replace(":block_id", this.block.id || "")
        .replace(":id", currentCheckbox.value || ""),
      {
        "checklist_element": {
          "checked": (currentCheckbox.checked).toString()
        }
      }
    ).subscribe(() => {
      this.translate.get("general.updated").subscribe((val: string) => {
        this.notifyService.showSuccess(val);
      });

    }, error => {
      this.translate.get("general.general_error").subscribe((val: string) => {
        this.notifyService.showError(val);
        console.error(error);
      });
    });

  }


}
