import { Component, OnInit } from '@angular/core';
import {AppService} from "../app.service";
import {TranslateService} from "@ngx-translate/core";
import {NotifyService} from "../notify.service";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  constructor(
    private appService: AppService,
    private translate: TranslateService,
    private notifyService: NotifyService
  ) {
    // If there is some message to show (after a redirect, e.g. logout),
    // show this now for one time.
    if ((sessionStorage.getItem('next-message')) && (typeof sessionStorage.getItem('next-message') === 'string')) {
      // @ts-ignore
      let messageContainer = sessionStorage.getItem('next-message').split("|");
      this.translate.get(messageContainer[1]).subscribe((val: string) => {
        this.notifyService.showAlert(val, messageContainer[0]);
      });
      sessionStorage.removeItem('next-message')
    }
  }

  ngOnInit(): void {
  }

}
