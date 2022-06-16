import { Injectable } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {Title} from "@angular/platform-browser";

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(
    private translate: TranslateService,
    private titleService: Title
  ) {}

  // Sets the page title and listens to a language change event.
  setPageTitle(key: string) {
    this.translate.onLangChange.subscribe(() => {
      this.setPageTitleNow(key);
    });

    this.setPageTitleNow(key);
  }

  private setPageTitleNow(key: string) {
    this.translate.get(key).subscribe((title: string) => {
      this.titleService.setTitle(title);
    });
  }
}
