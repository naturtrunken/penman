import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AppConst} from "../app.const";
import {BlockResponse} from "../models/block";
import { HttpClient } from "@angular/common/http";
import {TranslateService} from "@ngx-translate/core";
import {NotifyService} from "../notify.service";
import {UntypedFormBuilder, UntypedFormControl} from "@angular/forms";
import {FileUploadValidators} from '@iplab/ngx-file-upload';

@Component({
  selector: 'app-target-block-new',
  templateUrl: './target-block-new.component.html',
  styleUrls: ['./target-block-new.component.css']
})
export class TargetBlockNewComponent implements OnInit {

  private filesControl = new UntypedFormControl(null, FileUploadValidators.filesLimit(AppConst.FILE_UPLOAD_MAX_ELEMENTS));
  blockForm = this.formBuilder.group({
    text: '',
    output: '',
    files: this.filesControl,
    checklist_elements: ''
  });


  // Input phase
  @Input() phase: string = '';
  // Input service
  @Input() serviceId: string = '';

  // Stores the parameters from the URL.
  @Input() userId = '';
  @Input() networkId = '';
  @Input() targetId = '';

  // Receives the parent function for refreshing the blocks.
  @Output("loadBlocks") loadBlocks: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private http: HttpClient,
    private translate: TranslateService,
    private formBuilder: UntypedFormBuilder,
    private notifyService: NotifyService
  ) {
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    let text = this.blockForm.value["text"];
    let output = this.blockForm.value["output"];
    let checklistElements = this.blockForm.value["checklist_elements"];

    if (text == '') {
      this.translate.get("models.block.errors.text.missing").subscribe((val: string) => {
        this.notifyService.showInfo(val);
      });
      return;
    }

    let formData = new FormData();
    formData.append('block[text]', text);
    formData.append('block[output]', output);
    formData.append('block[phase]', this.phase);
    formData.append('block[checklist_elements]', checklistElements);
    formData.append('block[service_id]', this.serviceId);
    if (this.filesControl.value) {
      for (let i = 0; i < this.filesControl.value.length; i++) {
        formData.append('block[file' + i + ']', this.filesControl.value[i] );
      }
    }

    this.http.post<BlockResponse>(
      AppConst.BACKEND_BLOCKS_CREATE_PATH
        .replace(":user_id", this.userId || "")
        .replace(":network_id", this.networkId || "")
        .replace(":target_id", this.targetId || ""),
      formData
    ).subscribe(() => {
      this.translate.get("general.created").subscribe((val: string) => {
        this.notifyService.showSuccess(val);
      });

      // Trigger the function from the parent to reload the blocks.
      this.loadBlocks.emit();

      // Reset the form.
      this.blockForm.controls["text"].setValue("");
      this.blockForm.controls["output"].setValue("");
      this.blockForm.controls["checklist_elements"].setValue("");
      this.filesControl.setValue([]);
    }, error => {
      this.translate.get("general.general_error").subscribe((val: string) => {
        this.notifyService.showError(val);
        console.error(error);
      });
    });

  }

}
