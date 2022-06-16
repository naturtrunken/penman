import {Injectable} from '@angular/core';
import { NotifierService } from 'angular-notifier';

@Injectable({
  providedIn: 'root'
})
export class NotifyService {
  private readonly notifier: NotifierService;

  constructor(notifierService: NotifierService) {
    this.notifier = notifierService;
  }

  showAlert(msg: string, msgType: string) {
    switch(msgType) {
      case 'info': {
        this.showInfo(msg);
        break;
      }
      case 'success': {
        this.showSuccess(msg);
        break;
      }
      case 'error': {
        this.showError(msg);
        break;
      }
      default: {
        this.showError(msg);
        break;
      }
    }
  }

  showInfo(msg: string) {
    this.notifier.notify('info', msg);
  }

  showError(msg: string) {
    this.notifier.notify('error', msg);
  }

  showSuccess(msg: string) {
    this.notifier.notify('success', msg);
  }


}
