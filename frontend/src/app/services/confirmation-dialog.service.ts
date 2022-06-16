import {Injectable} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ConfirmationDialogComponent} from '../confirmation-dialog/confirmation-dialog.component';
import {TranslateService} from "@ngx-translate/core";

// https://stackblitz.com/edit/angular-confirmation-dialog

@Injectable()
export class ConfirmationDialogService {

  // Button default text. The magic strings are here for the initialization, but
  // the strings are fetches from the I18n module in the constructor.
  btnOkText: string = 'OK';
  btnCancelText: string = 'Cancel';


  constructor(
    private translate: TranslateService,
    private modalService: NgbModal
  ) {
    this.translate.get("general.ok").subscribe((val: string) => {
      this.btnOkText = val;
    });
    this.translate.get("general.cancel").subscribe((val: string) => {
      this.btnCancelText = val;
    });
  }

  public confirm(
    title: string,
    message: string,
    isDestroyDialog: boolean = false,
    btnOkText: string = this.btnOkText,
    btnCancelText: string = this.btnCancelText,
    dialogSize: 'sm' | 'lg' = 'lg'
  ): Promise<boolean> {
    const modalRef = this.modalService.open(ConfirmationDialogComponent, {size: dialogSize});
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.message = message;
    modalRef.componentInstance.btnOkText = btnOkText;
    modalRef.componentInstance.btnCancelText = btnCancelText;

    return modalRef.result;
  }

}
